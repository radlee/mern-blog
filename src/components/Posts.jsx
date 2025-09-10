import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Loader from '../components/Loader';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9; // keep consistent

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts?page=${currentPage}`);
        setPosts(response?.data.posts || []);
        setTotalPages(Math.ceil((response?.data.total || 0) / pageSize));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  if (isLoading) return <Loader />;

  // Pagination helpers
  const prevPages = Array.from({ length: Math.min(currentPage - 1, 4) }, (_, i) => currentPage - i - 1).reverse();
  const nextPages = Array.from({ length: Math.min(totalPages - currentPage, 4) }, (_, i) => currentPage + i + 1);

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

      <div className="wrapper">
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={handlePrevious}>Prev</button>
          
          {prevPages.map(page => (
            <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>
          ))}

          <button className="current">{currentPage}</button>

          {nextPages.map(page => (
            <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>
          ))}

          <button disabled={currentPage === totalPages} onClick={handleNext}>Next</button>
        </div>

        <hr />

        <div className="pageteller">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>
    </section>
  );
}

export default Posts;
