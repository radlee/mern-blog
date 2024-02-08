import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
             <h2 className="category_header">Featured Categories</h2>
            <ul className="footer__categories">
                <li><Link to='posts/categories/Technology'>Technology</Link></li>
                <li><Link to='posts/categories/Health and Wellness'>Health and Wellness</Link></li>
                <li><Link to='posts/categories/Personal Development'>Personal Development</Link></li>
                <li><Link to='posts/categories/Travel'>Travel</Link></li>
                <li><Link to='posts/categories/Finance'>Finance</Link></li>
                <li><Link to='posts/categories/Lifestyle'>Lifestyle</Link></li>
                <li><Link to='posts/categories/General'>General</Link></li>
                <li><Link to='posts/categories/Food and Cooking'>Food and Cooking</Link></li>
                <li><Link to='posts/categories/Career and Business'>Career and Business</Link></li>
            </ul>
            <div className="footer__copyright">
                <small>All Rights Reserved &copy; Copyright, radBlok Multimedia</small>
            </div>
        </footer>
    )
}

export default Footer;