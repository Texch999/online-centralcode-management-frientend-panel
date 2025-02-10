import React from "react";
import { Images } from "../../images";

const NoDataFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <img
                src={Images.nodatafound} // Replace with your image path
                alt="No Data Found"
                style={{ width: "200px", height: "200px" }}
            />
            <h3 className="mt-3 text-muted">No Data Found</h3>
            <p className="text-muted">There are no records for the selected currency.</p>
        </div>
    );
};

export default NoDataFound;