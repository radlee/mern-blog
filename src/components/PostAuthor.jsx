import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import default_avatar from '../images/avatar_placeholder.webp';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function PostAuthor({ authorID, createdAt }) {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.error('Failed to fetch author:', error);
      }
    };

    if (authorID) getAuthor();
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
      <div className="post__author-avatar">
        <img src={author?.avatar || default_avatar} alt="User Avatar" />
      </div>
      <div className="post__author-details">
        <h5>{author?.name || 'Unknown Author'}</h5>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
}

export default PostAuthor;
