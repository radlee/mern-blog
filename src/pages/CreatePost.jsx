import React, { useState, useContext, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const preset_key = 'radmultimedia';
  const cloud_name = 'dhdc57kw9';
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');

  
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to Home Page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const POST_CATEGORIES = ['Technology','Health and Wellness', 'Personal Development', 'Literature', 'Personal Development', 'Career and Business', 'Life Style', 'Finance', 'Food and Cooking'];

  const handleThumbnailChange = async (e) => {
    try {
      const file = e.target.files[0];
      setThumbnail(file);
      const imageData = new FormData();
      imageData.append('file', file);
      imageData.append('upload_preset', preset_key);
  
  
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, imageData);
      console.log("After Axios --- ", response.data);
  
      // SetThumbnail with the Cloudinary URL
      setThumbnail(response.data.secure_url || '');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Create FormData when thumbnailFile is updated
    if (thumbnail) {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('category', category);
      postData.append('content', content);
      postData.append('thumbnail', thumbnail);
    }
  }, [thumbnail, title, category, content]);

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('category', category);
      postData.append('content', content);
      postData.append('thumbnail', thumbnail); // Set thumbnail as the URL, not the entire image data
  console.log("Let us see 4563-- ", postData)
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, { withCredentials: true, headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    } });
  
      if (response.status === 201) {
        return navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const setContentValue = useCallback((value) => {
    setContent(value);
  }, [setContent]);

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create a Blog</h2>
        <img src={thumbnail} alt="" style={{ height: '300px' }} />
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" encType="multipart/form-data" onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill modules={modules} formats={formats} value={content} onChange={setContentValue} />
          <input type="file" name="thumbnail" onChange={handleThumbnailChange} accept="png, jpg, JPG, PNG, jpeg, JPEG, webp" />
          <button type='submit' className="btn primary">Publish</button>
          <br />
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
