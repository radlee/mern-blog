import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import Disqus from 'disqus-react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function PostDetail() {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error.message}</p>;
  }

  const disqusShortname = 'https-radblokmultimedia-onrender-com';

  const disqusConfig = {
    url: `https://radblokmultimedia.onrender.com/posts/${id}`, // Adjust the URL
    identifier: `${id}`,
    title: post ? post.title : '', // Check if post is not null before accessing properties
  };

  return (
    <section className="post-detail">
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.author} createdAt={post.createdAt} />
            {currentUser?.id === post?.author && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={post.thumbnail} alt="Thumbnail" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </div>
      )}
      <br />
      <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </section>
  );
}

export default PostDetail;
