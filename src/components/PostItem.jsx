import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

function PostItem({ postID, category, title, content, authorID, thumbnail, createdAt }) {
    const shortContent = content.length > 145 ? content.substr(0, 145) + '...' : content;
    const shortTitle = title.length > 50 ? title.substr(0, 50) + '...' : title;

    return (
        <article className="post">
            <div className="post__thumbnail">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{shortTitle}</h3>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: shortContent }} />
                <div className="post__footer">
                    <PostAuthor authorID={authorID} createdAt={createdAt} thumbnail={thumbnail} />
                    <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                </div>
            </div>
            <div className="fb-comments" data-href="https://radblok-dz7cdgzl9-radlees-projects.vercel.app/" data-width="" data-numposts="5"></div>
        </article>
    );
}

export default PostItem;
