import React from 'react'

import Thumbnail1 from '../images/blog1.jpg'
import Thumbnail2 from '../images/blog2.jpg'
import Thumbnail3 from '../images/blog3.jpg'
import Thumbnail4 from '../images/blog4.jpg'

const DUMMY = [
  {
    id: '1',
    thumbnail: Thumbnail1,
    category: 'Education',
    title: 'Doctors Orders',
    desc: 'I am going in. I am shady and Skary and Harry Killson',
    authorID: 3
  },
  {
    id: '2',
    thumbnail: Thumbnail2,
    category: 'Science',
    title: 'Doctors Orders and a Scientist',
    desc: 'I an starting to get it. I am going in. I am shady and Skary and Harry Killson',
    authorID: 1
  },
  {
    id: '3',
    thumbnail: Thumbnail1,
    category: 'Weather',
    title: 'Talking to my Diary',
    desc: 'Never let the shit ge to me. Go to shop till your feet get tired',
    authorID: 13
  },
  {
    id: '4',
    thumbnail: Thumbnail1,
    category: 'Events',
    title: 'Flash Back',
    desc: 'Damn I miss that',
    authorID: 11
  },
]
function Posts() {
  return (
    <div>Posts</div>
  )
}

export default Posts