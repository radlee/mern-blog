import React, { useContext, useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function EditPost() {
  const preset_key = 'radmultimedia';
  const cloud_name = 'dhdc57kw9';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const POST_CATEGORIES = [
    'General', 'Health and Wellness', 'Technology', 'Growth', 'Finance',
    'Career and Business', 'Travel', 'Lifestyle', 'Food and Cooking'
  ];

  // Quill toolbar + formats
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'code-block', 'list', 'bullet', 'indent', 'link', 'image', 'video',
    'color', 'background', 'script', 'font', 'size', 'align', 'direction'
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const handleThumbnailChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset_key);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      setThumbnailURL(response.data.secure_url || '');
    } catch (err) {
      console.error(err);
      setError("Failed to upload thumbnail");
    }
  };

  // Load post data
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category);
        setThumbnailURL(res.data.thumbnail);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch post data");
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();
    if (!thumbnailURL) return setError("Thumbnail is required");

    const postData = new FormData();
    postData.append('title', title);
    postData.append('category', category);
    postData.append('content', content);
    postData.append('thumbnail', thumbnailURL);

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (res.status === 200) navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update post");
    }
  };

  const setContentValue = useCallback((value) => setContent(value), []);

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit and Update a Blog</h2>
        {thumbnailURL && <img src={thumbnailURL} alt="Thumbnail Preview" style={{ height: '300px' }} />}
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={editPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContentValue}
          />
          <input
            type="file"
            onChange={handleThumbnailChange}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <button type="submit" className="btn primary">Update</button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
