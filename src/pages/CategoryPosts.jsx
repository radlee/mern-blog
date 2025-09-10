import React, { useEffect, useState, useContext } from 'react';
import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
      setIsLoading(false);
    };

    if (token) fetchPosts(); // only fetch if token exists
  }, [category, token, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ _id: id, thumbnail, category, title, content, author, createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              content={content}
              authorID={author}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No Posts Published</h2>
      )}
    </section>
  );
}

export default CategoryPosts;
