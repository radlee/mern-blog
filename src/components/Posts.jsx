import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Loader from '../components/Loader';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts?page=${currentPage}`);
        setPosts(response?.data.posts);
        setTotalPages(Math.ceil(response?.data.total / 9)); // Assuming page_size is always 10
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

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
        <div className="warpper">
          <div className="pagination">
          <button disabled={currentPage === 1} onClick={handlePrevious}>
            Prev
          </button>
          {/* Additional pagination options on the left */}
          {Array.from({ length: Math.min(currentPage - 1, 4) }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(currentPage - i - 1)}>
              {currentPage - i - 1}
            </button>
          ))}
          
          {/* Additional pagination options on the right */}
          {Array.from({ length: Math.min(totalPages - currentPage, 4) }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(currentPage + i + 1)}>
              {currentPage + i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={handleNext}>
            Next
          </button>
        </div>
        <hr />
        <div className='pageteller'>
          <button id='counter'>Page {currentPage} of {totalPages}</button>
        </div>
      </div>
    </section>
  );
}

export default Posts;
