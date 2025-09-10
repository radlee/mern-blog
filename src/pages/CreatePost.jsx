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
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const POST_CATEGORIES = [
    'Technology', 'Health and Wellness', 'Growth', 'Literature',
    'Career and Business', 'Life Style', 'Finance', 'Food and Cooking'
  ];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background', 'script', 'font', 'size', 'align', 'direction',
    'code', 'formula', 'clean'
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const handleThumbnailChange = async (e) => {
    try {
      const file = e.target.files[0];
      setThumbnailFile(file);

      const imageData = new FormData();
      imageData.append('file', file);
      imageData.append('upload_preset', preset_key);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        imageData
      );

      setThumbnailURL(response.data.secure_url || '');
    } catch (err) {
      console.error(err);
      setError("Failed to upload thumbnail");
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (!thumbnailURL) return setError("Thumbnail is required");

    try {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('category', category);
      postData.append('content', content);
      postData.append('thumbnail', thumbnailURL);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        {
          headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (response.status === 201) navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create post");
    }
  };

  const setContentValue = useCallback((value) => setContent(value), []);

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create a Blog</h2>
        {thumbnailURL && <img src={thumbnailURL} alt="Thumbnail Preview" style={{ height: '300px' }} />}
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill modules={modules} formats={formats} value={content} onChange={setContentValue} />
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          <button type='submit' className="btn primary">Publish</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
