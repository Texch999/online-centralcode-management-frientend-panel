import { CgSoftwareUpload } from "react-icons/cg";
import { whiteReactSelect } from "../../components/ReactSelectStyles";
import Select from "react-select";

function WhiteLabelSetting() {
  const titleOptions = [{ value: "company", label: "Company" }];
  const websiteOptions = [{ value: "website", label: "Website" }];
  return (
    <div>
      <div className="mb-3 mt-2">
        <h6 className="yellow-font mb-0">White Label Setting </h6>
      </div>
      <div className="table-wrapper px-3 pb-4">
        <div className="row">
          <div className="col-12 flex-column mt-3">
            <label className="black-text4 small-font mb-1">
              Application Title
            </label>
            <Select
              className="small-font"
              options={titleOptions}
              placeholder="Select"
              styles={whiteReactSelect}
              menuPlacement="auto"
            />
          </div>
          <div className="col-9 flex-column mt-3">
            <label className="black-text4 small-font mb-1">Website</label>
            <Select
              className="small-font"
              options={websiteOptions}
              placeholder="Select"
              styles={whiteReactSelect}
              menuPlacement="auto"
            />
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
            <label
              className="flex-between input-css2 small-font mt-4"
              htmlFor="change_website_icon"
            >
              <span>Upload</span>
              <CgSoftwareUpload className="black-text4" size={18} />
              <input
                id="change_website_icon"
                type="file"
                style={{ display: "none" }}
              />
            </label>
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
            <label
              className="flex-between input-css2 small-font mt-4"
              htmlFor="change_website_logo"
            >
              <span>Upload</span>
              <CgSoftwareUpload className="black-text4" size={18} />
              <input
                id="change_website_logo"
                type="file"
                style={{ display: "none" }}
              />
            </label>
            <span className="grey-font small-font mt-2">
              *Any image with maximum size 4050 KB
            </span>
          </div>
          <div className="col-9 flex-column mt-3">
            <label className="black-text4 small-font mb-1">Primary Color</label>
            <select className="input-css2 small-font grey-bg4 border white-text">
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
        <hr className="my-4" />
        <div className="flex-end small-font">
          <button className="input-css2 br-4px px-4 black-text4 black-border">
            Cancel
          </button>
          <button className="saffron-btn2 br-4px px-4 ms-4">Save</button>
        </div>
      </div>
    </div>
  );
}

export default WhiteLabelSetting;
