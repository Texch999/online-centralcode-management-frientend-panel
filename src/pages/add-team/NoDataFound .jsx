import React from "react";
import { Images } from "../../images";

const NoDataFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <img
                src={Images.nodatafound} // Replace with your image path
                alt="No Data Found"
               className="w-20 h-20"
            />
        </div>
    );
};

export default NoDataFound;