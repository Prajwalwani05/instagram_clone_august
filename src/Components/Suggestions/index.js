import React from 'react';
import "./suggestions.css";

const index = () => {
  return (
    <div className='suggestion'>
        <h3>Suggestions for you</h3>
        <div className='card'>
          <div className='secondary'>
            <div className='profile'></div>
          <div>
            <h4>Ranbeer</h4>
            <p>New to Instagram</p>
          </div>
          </div>
          <button classname="followBtn">Follow</button>
        </div>
        <div className='card'>
          <div className='secondary'>
            <div className='profile'></div>
          <div>
            <h4>Suhas</h4>
            <p>New to Instagram</p>
          </div>
          </div>
          <button classname="followBtn">Follow</button>
        </div>
        <div className='card'>
          <div className='secondary'>
            <div className='profile'></div>
          <div>
            <h4>Prajwal</h4>
            <p>New to Instagram</p>
          </div>
          </div>
          <button classname="followBtn">Follow</button>
        </div>
        <div className='card'>
          <div className='secondary'>
            <div className='profile'></div>
          <div>
            <h4>Monu</h4>
            <p>New to Instagram</p>
          </div>
          </div>
          <button classname="followBtn">Follow</button>
        </div>
    </div>
  )
}

export default index