import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <ul className="footer__categories">
                <li><Link to='posts/categories/Robotics'>Robotics</Link></li>
                <li><Link to='posts/categories/I.O.T'>I.O.T</Link></li>
                <li><Link to='posts/categories/Art'>Art</Link></li>
                <li><Link to='posts/categories/Weather'>Weather</Link></li>
                <li><Link to='posts/categories/Data Science'>'Data Science</Link></li>
                <li><Link to='posts/categories/JavaScript'>JavaScript</Link></li>
                <li><Link to='posts/categories/General'>General</Link></li>
                <li><Link to='posts/categories/Design'>Design</Link></li>
            </ul>
            <div className="footer__copyright">
                <small>All Rights Reserved &copy; Copyright, radBlok Multimedia</small>
            </div>
        </footer>
    )
}

export default Footer;