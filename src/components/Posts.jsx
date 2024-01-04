import React, { useState } from 'react'

import Thumbnail1 from '../images/blog5.jpg'
import Thumbnail2 from '../images/blog2.jpg'
import Thumbnail3 from '../images/blog3.jpg'
import Thumbnail4 from '../images/blog4.jpg'

import PostItem from './PostItem'

const DUMMY = [
  {
    id: '1',
    thumbnail: Thumbnail1,
    category: 'Education',
    title: 'Doctors Orders',
    content: 'I am going in. I am shady and Skary and Harry Killson',
    authorID: 3
  },
  {
    id: '2',
    thumbnail: Thumbnail2,
    category: 'Science',
    title: 'Doctors Orders and a Scientist Doctors Orders and a Scientist',
    content: 'I an starting to get it. I am going in. I am shady and Skary and Harry Killson Doctors Orders and a Scientist I an starting to get it. I am going in. I am shady and Skary and Harry Killso',
    authorID: 1
  },
  {
    id: '3',
    thumbnail: Thumbnail3,
    category: 'Weather',
    title: 'Talking to my Diary',
    content: 'Never let the shit ge to me. Go to shop till your feet get tired',
    authorID: 13
  },
  {
    id: '4',
    thumbnail: Thumbnail4,
    category: 'Events',
    title: 'Flash Back',
    content: 'Damn I miss that',
    authorID: 11
  },
]

function Posts() {
  const [posts, setPosts] = useState(DUMMY);

  return (
    <section className="posts">
       <div className="container posts_container">
        {
          posts.map(({id, thumbnail, category, title, content, authorID}) => 
          <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
          content={content} authorID={authorID} />)
        }
       </div>
    </section>
  )
}

export default Posts