import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <seection className="error-page">
      <div className="center">
        <Link to='/' className='btn primary'>GO Back Homeses</Link>
        <h2>Page Not Found</h2>
      </div>
    </seection>
  )
}

export default ErrorPage