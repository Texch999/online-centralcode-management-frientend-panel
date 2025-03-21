import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { customStyles } from "../../components/ReactSelectStyles";
import { getAdminWebsites, getDirById, getDirectorDwnList } from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import { commissionTypes } from "../../utils/enum";
import SuccessPopup from "../popups/SuccessPopup";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Select from "react-select";

const DirectorSuperAdminaccessedWebsites = () => {
    const location = useLocation();
    const { userId, name, roleId } = location.state
    const role = localStorage.getItem("role_code");
    const [tableData, setTableData] = useState([]);
    const [tableSuperAdminData, setTableSuperAdminData] = useState([]);
    const [adminWebsites, setAdminWebsites] = useState([]);
    const [filterError, setFilterError] = useState("");
    const navigate = useNavigate(); // Use useNavigate instead of useNavigation
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 7;
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || 1);
    const [totalRecords, setTotalRecords] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false);
    const [discription, setDiscription] = useState(null);
    const [selectedAdminSite, setSelectedAdminSite] = useState("");
    const [dataById, setDataById] = useState([]);

    const fetchDirById = (adminId) => {
        const params = {
            adminPanId: adminId || undefined,
        };
        getDirById({ userId, params })
            .then((response) => {
                setDataById(response?.list);
            })
            .catch((error) => {
                console.error("API error");
            });
    };

    const fetchAdminWebsites = () => {
        getAdminWebsites()
            .then((response) => {
                if (response.status === true) {
                    const options = response?.data?.map((item) => ({
                        value: item.id,
                        label: item.web_name,
                    }));
                    setAdminWebsites(options);
                }
            })
            .catch((error) => {
                console.error("API error");
            });
    };

    const columns = [
        { header: "User Website", field: "usersite" },
        { header: "P/L", field: "pl" },
        { header: "Exposure", field: "exposure" },
        { header: "Site Lock", field: "sitelock" },
        { header: "Bet Lock", field: "BetLock" },
        { header: "C Lock", field: "clock" },
        {
            header: <div className="text-center">Action</div>,
            field: "action",
            width: "8%",
        },
    ];

    const GetAllSuperAdmin = (limit, offset) => {
        getDirectorDwnList({ limit, offset })
            .then((response) => {
                if (response.status === true) {
                    setTableSuperAdminData(response.directorsWithWebsites);
                } else {
                    console.error("Something Went Wrong");
                }
            })
            .catch((error) => {
                console.error(error?.message || "Failed to fetch directors");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const limit = itemsPerPage;
        const offset = (page - 1) * itemsPerPage;

        if (role === "director") {
            GetAllSuperAdmin(limit, offset);
        } else if (role === "management") {
            fetchDirById();
            fetchAdminWebsites();
        }
    }, [role, page]);

    const TableData = dataById?.map((user) => {
        return {
            usersite: (
                <div className="d-flex flex-column">
                    <div className="me-1">
                        <span className="p-1 text-capitalize">{user.userPanel}</span>
                    </div>
                    <div className="me-1">
                        <span className="p-1 text-capitalize">{`${user.adminPanel} - ${user.share}`}</span>
                    </div>
                </div>
            ),
            pl: <div className="red-font">{user.pl}</div>,
            exposure: <div className="red-font">{user.exposure}</div>,
            sitelock: (
                <div className="red-font">
                    <input
                        type="checkbox"
                        className="custom-checkbox"
                        style={{ border: "2px solid rgba(226, 80, 80, 0.2)" }}
                    />
                </div>
            ),
            BetLock: (
                <div className="red-font">
                    <input type="checkbox" className="custom-checkbox" />
                </div>
            ),
            clock: (
                <div className="red-font">
                    <input
                        type="checkbox"
                        className="custom-checkbox"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}
                    />
                </div>
            ),
            action: (
                <div className="d-flex flex-center gap-3">
                    <div className="gap-2 d-flex flex-row">
                        <div className="gc-contoll-bg px-3 py-2 rounded pointer">GC</div>
                        <div className="cc-contoll-bg px-3 py-2 rounded pointer">CC</div>
                        <div className="wc-contoll-bg px-3 py-2 rounded pointer">WC</div>
                    </div>
                </div>
            ),
        };
    });

    const handlePageChange = ({ limit, offset }) => {
        GetAllSuperAdmin(limit, offset);
    };

    const hanldeFilter = () => {
        const adnId = selectedAdminSite.value;
        if (adnId) {
            fetchDirById(adnId);
            setFilterError("");
        } else {
            setFilterError("Please select Admin panel");
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className="d-flex flex-column mb-3 mt-2">
                {role === "management" ? (
                    <h6 className="yellow-font medium-font mb-0">
                        <MdOutlineKeyboardArrowLeft size={30} onClick={handleBack} className="pointer" />
                        <span className="text-capitalize medium-font fw-600">{`${roleId == 1 ? "Director" : "Super Admin"} - ${name}`} </span>
                    </h6>
                ) : (
                    <h6 className="yellow-font mb-0">Add Super Admin</h6>
                )}
                <div className="d-flex flex-column mt-2">
                    <label className="small-font">Select Admin</label>
                    <div className="d-flex flex-row mt-1">
                        <Select
                            className="small-font me-2 col-2 text-capitalize"
                            options={adminWebsites}
                            placeholder="Select"
                            styles={customStyles}
                            value={selectedAdminSite}
                            onChange={(option) => setSelectedAdminSite(option)}
                        />
                        <button className="saffron-btn rounded px-4 medium-font" onClick={hanldeFilter}>
                            Submit
                        </button>
                    </div>
                    <span className="small-font red-font pt-1">{filterError}</span>
                </div>
            </div>

            {loading ? (
                <div className="d-flex flex-column flex-center mt-10rem align-items-center">
                    <CircleLoader color="#3498db" size={40} />
                    <div className="medium-font black-font my-3">Just a moment...............⏳</div>
                </div>
            ) : (
                <>
                    {role === "management" ? (
                        <Table
                            data={TableData}
                            columns={columns}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                            totalRecords={totalRecords}
                            bg="#F2F2F2"
                        />
                    ) : (
                        <Table
                            data={tableSuperAdminData}
                            columns={columns}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                            totalRecords={totalRecords}
                        />
                    )}
                </>
            )}

            {successPopupOpen && (
                <SuccessPopup
                    successPopupOpen={successPopupOpen}
                    setSuccessPopupOpen={setSuccessPopupOpen}
                    discription={discription}
                />
            )}
        </div>
    );
};

export default DirectorSuperAdminaccessedWebsites;