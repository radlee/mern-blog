import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';

import { UserContext } from '../context/userContext';
import axios from 'axios';


function PostDetail() {
    
    const { currentUser } = useContext(UserContext);
    // const { cu_id } = currentUser.id;
    const { id } = useParams();
    console.log("Params id : ", id)
    // console.log("Current User id : ", cu_id)
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
        }
        getPost();
    }, []);

    if(isLoading) {
        return <Loader />
    }
    return (
        <section className="post-detail">
            {error && <p className='error'>{error}</p>}
            {post && <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor authorID={post.author} createdAt={post.createdAt}/>
                    {currentUser?.id === post?.author && <div className="post-detail__buttons">
                        <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                        <DeletePost postId={id} />
                    </div>}
                </div>
                <h1>{post.title}</h1>
                <div className="post-detail__thumbnail">
                    <img src={post.thumbnail} alt="Thumbnail" />
                </div>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </div> }
            <div class="fb-comments" data-href="https://radblokmultimedia.onrender.com" data-width="" data-numposts="5"></div>
        </section>
    )
}

export default PostDetail
