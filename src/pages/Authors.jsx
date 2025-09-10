/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserContext } from '../context/userContext';
import default_avatar from '../images/avatar_placeholder.webp';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  console.log('Authors :: ', authors);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
        // Optional: redirect if unauthorized
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
      setIsLoading(false);
    };

    if (token) getAuthors(); // only fetch if token exists
  }, [token, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ _id: id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/users/${id}`} className="author">
              <div className="author__avatar">
                {avatar ? (
                  <img src={avatar} alt={`Avatar of ${name}`} />
                ) : (
                  <img src={default_avatar} alt={`Image of ${name}`} />
                )}
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center">No Users/Authors Found</h2>
      )}
    </section>
  );
}

export default Authors;
