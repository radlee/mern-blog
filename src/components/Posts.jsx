import React, { useState } from 'react'

import { DUMMY } from '../data'

import PostItem from './PostItem'

function Posts() {
  const [posts, setPosts] = useState(DUMMY);

  return (
    <section className="posts">
       {posts.length > 0 ? <div className="container posts__container">
        {
          posts.map(({id, thumbnail, category, title, content, authorID}) => 
          <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
          content={content} authorID={authorID} />)
        }
       </div> : <h2 className='center'>No Posts Published</h2> }
    </section>
  )
}

export default Posts