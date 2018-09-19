import React from 'react'

const Toast = ({children, active, delay, ...props}) => {
  return (
    <div className={`emoji-toast notification is-primary ${active ? 'active' : ''}`}>
      <div className="container has-text-centered">
        {children}
      </div>
    </div>
  )
}

export default Toast
