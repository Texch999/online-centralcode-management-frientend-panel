import React from 'react'
import { Modal } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'
import { Images } from '../../images'

const DeletePopup = ({show, setShow, title}) => {
  return (
    <Modal show={show} setShow={()=>setShow(false)} centered size='md'>
    <div className='p-2 white-bg radius-20 text-black'>
        <div className='flex-end px-1 py-1 pointer' onClick={()=>setShow(false)}>
        <IoClose className='font-25 text-black'/>
        </div>
        <div className='d-flex flex-column'>
            <div className='flex-center'>
                <img src={Images?.qnmark} alt="" />
            </div>
            <div className='flex-center my-2 medium-font'>Are You Sure to Delete this {title}?</div>
            <div className='d-flex flex-center my-2 medium-font pointer'>
            <div className='input-css2 br-5 w-50 text-center mx-2' onClick={()=>setShow(false)}>Cancle</div>
            <div className='saffron-btn br-5 text-center w-50'>Delete</div>
            </div>
        </div>
    </div>

</Modal>
  )
}

export default DeletePopup