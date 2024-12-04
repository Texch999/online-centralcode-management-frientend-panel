import React from "react";

function WhiteLabelSetting() {
  return (
    <div>
      <div className="mb-3 mt-2">
        <h6 className="yellow-font mb-0">White Label Setting </h6>
      </div>
      <div className="table-wrapper px-3 pb-3">
        <div className="row">
          <div className="col-12 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              Application Title
            </label>
            <select className="input-css2 small-font black-text4">
              <option>Company</option>
            </select>
          </div>
          <div className="col-9 flex-column mt-3">
            <label className="black-text4 small-font mb-1">Website</label>
            <select className="input-css2 small-font">
              <option>Select</option>
            </select>
          </div>
          <div className="col-3 flex-end mt-3">
            <button className="w-100 input-css2 small-font flex-center black-text4 black-border">
              Add New Website
            </button>
          </div>
          <div className="col-2 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              New Website Name
            </label>
            <input className="input-css2 small-font" placeholder="Enter" />
          </div>
          <div className="col-5 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              New Website URL Users
            </label>
            <input className="input-css2 small-font" placeholder="Enter" />
          </div>
          <div className="col-5 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              New Website URL Admins
            </label>
            <input className="input-css2 small-font" placeholder="Enter" />
          </div>
          <div className="col-2 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              Change Website Icon
            </label>
            <div className="input-css2 small-font h-12vh flex-center">
              Preview
            </div>
          </div>
          <div className="col-4 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              New Website URL Users
            </label>
            <input className="input-css2 small-font" placeholder="Enter" />
            <span className="grey-font small-font mt-2">
              *.ico, *gif or * png image with maximum size 256 KB
            </span>
          </div>
          <div className="col-2 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              Change Website Logo
            </label>
            <div className="input-css2 small-font h-12vh flex-center">
              Preview
            </div>
          </div>
          <div className="col-4 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              New Website URL Admins
            </label>
            <input className="input-css2 small-font" placeholder="Enter" />
            <span className="grey-font small-font mt-2">
              *Any image with maximum size 4050 KB
            </span>
          </div>
          <div className="col-9 flex-column mt-3">
            <label className="black-text4 small-font mb-1">Primary Color</label>
            <select className="input-css2 small-font grey-bg3 border white-text">
              <option>Grey</option>
            </select>
          </div>
          <div className="col-3 flex-end mt-3">
            <button className="w-100 input-css2 small-font flex-center black-text4 black-border">
              Customized
            </button>
          </div>
          <div className="col-9 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              Secondary Color
            </label>
            <select className="input-css2 small-font yellow-bg border white-text">
              <option>Yellow</option>
            </select>
          </div>
          <div className="col-3 flex-end mt-3">
            <button className="w-100 input-css2 small-font flex-center black-text4 black-border">
              Customized
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default WhiteLabelSetting;
