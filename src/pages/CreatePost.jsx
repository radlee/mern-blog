import React, { useState, useContext, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
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

  const POST_CATEGORIES = ['Robotics', 'Web Development', 'General', 'Web Of Things', 'Data Science', 'Art', 'Education', 'Design', 'Weather'];

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();

    postData.set('title', title);
    postData.set('category', category);
    postData.set('content', content);
    postData.set('thumbnail', thumbnail);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
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

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create a Blog</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form action="" className="form create-post__form" onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill modules={modules} formats={formats} value={content} onChange={setContentValue} />
          <input type="file" name="thumbnail" onChange={handleThumbnailChange} accept="png, jpg, JPG, PNG, jpeg, JPEG, webp" />
          <button type='submit' className="btn primary">Publish</button>
        </form>

        <img src={''} alt="" style={{ height: '300px' }} />
      </div>
    </section>
  );
}

export default CreatePost;
