import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail1 from '../images/blog22.jpg'

function PostDetail() {
    return (
        <section className="post-detail">
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor />
                    <div className="post-detail__buttons">
                        <Link to={`/posts/lee/edit`} className='btn sm primary'>Edit</Link>
                        <Link to={`/posts/lee/delete`} className='btn sm danger'>Delete</Link>
                    </div>
                </div>
                <h1>Post Title</h1>
                <div className="post-detail__thumbnail">
                    <img src={Thumbnail1} alt="" />
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, soluta possimus, dicta dolore et excepturi voluptatem alias ea qui, necessitatibus doloremque. Et nisi asperiores aliquid ut eaque totam, culpa eius.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit ea vel velit perspiciatis aperiam, necessitatibus, maiores nulla magnam ullam repellendus nam natus animi aut error doloremque atque sunt eaque officia odit possimus! Architecto odit aspernatur beatae amet debitis doloribus, atque minus adipisci saepe earum voluptas labore modi iure ut. Magnam!
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, qui ut! Reprehenderit magnam cupiditate facilis itaque iste nemo perspiciatis minima! Quam repellat fugit, itaque, laboriosam, sint ullam quae maiores accusantium rerum aliquid odio et a facere! Eligendi, rerum tempore? Facilis sed tenetur officia similique rem eaque iste, dolorem minus sit necessitatibus aliquid, quidem fugiat odio.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio corrupti itaque saepe quae quo, vero laborum necessitatibus eius quos culpa, distinctio enim nihil minus corporis aspernatur? Recusandae error neque eos suscipit eaque rem laboriosam eum vel! Modi eligendi iste doloremque perspiciatis sit, aut quae optio assumenda iusto? Minima modi pariatur unde aut expedita atque fugit. Rerum, dolores quia iure natus provident, dolorum laudantium cupiditate architecto odio ad sapiente amet commodi mollitia dicta tenetur reprehenderit aliquid laboriosam laborum sunt, fugit similique perferendis magni nihil! Enim nesciunt rem non doloremque aliquid ipsam illum esse. Voluptas repellendus, quas ullam maiores explicabo voluptates doloribus eum, illo accusantium ab obcaecati, est impedit perspiciatis fugiat laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cupiditate error sunt reprehenderit quod. Porro ullam placeat officiis fugiat magnam reiciendis vel in dicta, dolorum, inventore mollitia quia qui vero facilis ut libero corporis voluptas modi id numquam rerum quos illum aliquid molestias! Incidunt pariatur explicabo expedita distinctio itaque corrupti aliquid, quo reiciendis totam, tempora saepe accusamus natus architecto eligendi sapiente nam similique officia quaerat dolorum id sunt ipsam commodi! Tempore qui dolores reiciendis nesciunt dolorem expedita perferendis, molestiae doloremque neque tenetur. Pariatur quisquam laboriosam accusantium laudantium molestias autem eos veniam adipisci fugit repudiandae velit iure ipsa ipsam, asperiores voluptate illum nam ad, sint nemo dolor? Nobis velit libero temporibus hic ea expedita ipsa vero officiis quaerat! Explicabo libero, optio possimus debitis quas iusto, dolore quidem eius magni, veniam fugit fuga facilis sequi facere totam? Delectus rerum facere illum. Dolorem ex nihil sapiente dicta modi? Accusamus dolor perferendis quis deleniti earum, voluptatum natus aperiam dolorem exercitationem, alias molestias amet fugit ut eos rem tempora eius dicta animi praesentium error eligendi vel laboriosam. Iste, quam? Hic accusantium corporis optio quidem eveniet exercitationem, ipsam maiores, nulla recusandae quod minima accusamus voluptas sint? Quis ad explicabo temporibus! Ipsam beatae explicabo porro dolorem maxime.
                </p>
            </div>
        </section>
    )
}

export default PostDetail
