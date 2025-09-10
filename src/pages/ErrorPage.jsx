import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section className="error-page">
      <div className="center">
        <h2>Page Not Found</h2>
        <Link to='/' className='btn primary'>GO Back Homeses</Link>
        
      </div>
    </section>
  )
}

export default ErrorPage