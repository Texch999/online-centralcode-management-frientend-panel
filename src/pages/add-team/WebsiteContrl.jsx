import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";

const WebsiteContrl = ({ show, setShow }) => {
    const [pswdVisible,setPswdVisible]=useState(false)
    const handlePswd =()=>{
        setPswdVisible((prev)=>!prev)
    }
  const userwebsites = [
    {
      name: "www.website.com",
      control: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      name: "www.website.com",
      control: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      name: "www.website.com",
      control: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      name: "www.website.com",
      control: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
  ];
  return (
    <Modal centered size="md" show={show} onHide={setShow}>
      <div className="p-2">
        <div className="d-flex flex-between medium-font">
          <div>Website Control</div>
          <div>
            <IoClose size={23} onClick={() => setShow(false)} />
          </div>
        </div>
        <div className="small-font my-1">User Website</div>
        <div className="d-flex flex-column">
          {userwebsites?.map((item) => (
            <div className="input-bg flex-between br-5 my-1 p-2 align-items-center small-font">
              <div>{item?.name}</div>
              <div>{item?.control}</div>
            </div>
          ))}
        </div>
        <div className="small-font my-1">Management Password</div>
        <div className="row small-font">
          <div className="col-6">
            <div className="input-bg d-flex br-5 py-2 px-2 flex-between ">
              <input
                className="all-none"
                type={pswdVisible ? "text" :"password"}
                placeholder="Enetr Password"
              />
              {pswdVisible ? (
                <IoEye className="black-font" size={15} onClick={handlePswd}/>
              ) : (
                <IoEyeOff className="black-font" size={15} onClick={handlePswd}/>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="saffron-btn2 pointer">Submit</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WebsiteContrl;
