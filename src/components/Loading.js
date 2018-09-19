import React from 'react'

const Loading = ({children, active, delay, ...props}) => {
  return (
    <div className={`loading-hero ${active ? '' : 'is-hidden'}`}>
      <div className="container has-text-centered has-text-vcentered">
        <button className='button is-loading is-transparent'></button>
      </div>
    </div>
  )
}

export default Loading
