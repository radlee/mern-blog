import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
    return (
        <footer className="catse">
            <ul className="footer__categories">
                <li><Link to='posts/categories/Robotics'>Robotics</Link></li>
                <li><Link to='posts/categories/Technology'>Technology</Link></li>
                <li><Link to='posts/categories/Business'>Business</Link></li>
                <li><Link to='posts/categories/Literature'>Literature</Link></li>
                <li><Link to='posts/categories/Data Link'>Data Link</Link></li>
                <li><Link to='posts/categories/Life Style'>Life Style</Link></li>
                <li><Link to='posts/categories/General'>General</Link></li>
                <li><Link to='posts/categories/Design'>Design</Link></li>
            </ul>
            <div className="footer__copyright"></div>
        </footer>
    )
}

export default Categories;