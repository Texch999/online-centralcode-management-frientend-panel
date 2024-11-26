import React from 'react'
import { IoAddOutline } from 'react-icons/io5'

const PrivacyPolicy = () => {
  return (
    <div>
        <div className="d-flex w-100 flex-between">
        <div className="col-7 fw-600 ">
            <h6 className='yellow-font'>Privacy Policy</h6>
        
        </div>
        <div className="col-5 d-flex flex-between"> <div className="col-5 ">
          <select className="input-css2 col-12 mt-4 small-font">
            <option>All</option>
          </select>
        </div>
        <div className="saffron-btn2 small-font pointer mt-4 col-3 mx-2">Submit</div>
        <div
          className="bg-white small-font pointer mt-4 col-3 p-2 blue-font grey-border rounded flex-center "
          
        >
          <IoAddOutline className="large-font" /> Add new
        </div></div>
       
      </div>
    </div>
  )
}

export default PrivacyPolicy