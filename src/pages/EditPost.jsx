import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function EditPost() {
  const preset_key = 'radmultimedia';
  const cloud_name = 'dhdc57kw9';
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');

  console.log('Title ::: ', title)
  console.log('Category ::: ', category)
  console.log('Content ::: ', content)
  console.log('Thumbnail ::: ', thumbnail)

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  // Redirect to Home Page for any user who is not logged in
  useEffect(() => {
      if(!token) {
      navigate('/login')
      }
  }, [token, navigate]);


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'] // remove formatting button
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background', 'script', 'font', 'size', 'align', 'direction',
    'code', 'formula', 'clean'
  ];

  const POST_CATEGORIES = ['General','Health and Wellness', 'Technology', 'Growth', 'Finance', 'Career and Business', 'Travel', 'Lifestyle','Food and Cooking']

  const handleThumbnailChange = async (e) => {
    try {
      const file = e.target.files[0];
      setThumbnail(file);
      const imageData = new FormData();
      imageData.append('file', file);
      imageData.append('upload_preset', preset_key);
  
  
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, imageData);
      console.log("After Edit Axios --- ", response.data);
  
      // SetThumbnail with the Cloudinary URL
      setThumbnail(response.data.secure_url || '');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category); // Set the category from the response
        setThumbnail(response.data.thumbnail); // Set the thumbnail from the response
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();

    postData.append('title', title);
    postData.append('category', category);
    postData.append('content', content);
    postData.append('thumbnail', thumbnail);

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {withCredentials: true, headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }});
      if(response.status === 200) {
        return navigate('/');
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit and Update a Blog</h2>
        <img src={thumbnail} alt="" style={{ height: '300px' }} />
        {error && <p className="form__error-message">{error.message}</p>}
        <form className="form create-post__form" encType="multipart/form-data" onSubmit={ editPost }>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          

          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

            <ReactQuill modules={modules} formats={formats} value={content} onChange={setContent}/>
            <input type="file" onChange={handleThumbnailChange} accept='png, jpg, jpeg, webp'/>
          <button type='submit' className="btn primary">Update</button>
          <br />
          <br />
        </form>
      </div>
    </section>
  )
}

export default EditPost