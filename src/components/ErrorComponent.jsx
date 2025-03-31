import React from 'react'

const ErrorComponent = ({error}) => {
    console.log(error,"==>error123");
    
  return (
    <div className='error-bg br-5 fw-600 small-font '>
        <div className='my-2'>
       
        <ul className='py-3 s-errors'>
            <li> {error}</li>
        
        </ul>
        </div>
    </div>
  )
}

export default ErrorComponent