import React from 'react'
import { Modal } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'
import { Images } from './../../images/index';

const ActionPopup = ({show, setShow}) => {
  return (
    <Modal show={show} setShow={()=>setShow(false)} centered>
        <div className='p-2 white-bg radius-20 text-black'>
            <div className='flex-end px-1 py-1 pointer' onClick={()=>setShow(false)}>
            <IoClose className='font-25 text-black'/>
            </div>
            <div className='d-flex flex-column'>
                <div className='flex-center'>
                    <img src={Images?.qnmark} alt="" />
                </div>
                <div className='flex-center my-2 medium-font'>Are you sure to active this provider?</div>
                <div className='d-flex flex-center my-2 medium-font pointer'>
                <div className='input-css2 br-5 w-50 text-center mx-2' onClick={()=>setShow(false)}>Cancle</div>
                <div className='saffron-btn br-5 text-center w-50'>Active</div>
                </div>
            </div>
        </div>

    </Modal>
  )
}

export default ActionPopup