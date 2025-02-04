import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import Table from '../../components/Table'
import { BsEye } from 'react-icons/bs'
import { MdBlockFlipped, MdLockReset } from 'react-icons/md'
import { SlPencil } from 'react-icons/sl'
import AddDirectorAdminModal from './popups/AddDirectorAdminPopup'
import AddManagementPopup from './popups/AddManagementPopup'
import AddDirectorPopup from './popups/AddDirectorPopup'
import { getDirectorEmployees } from '../../api/apiMethods'

function AddDirectorTeam() {
    const role = localStorage.getItem("role_code")

    const [tableData, setTableData] = useState()
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState()
    const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
    const [confirmationPopup, setConfirmationPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Tracks user for reset or block actions
    const [directorId, setDirectorId] = useState()
    const handleModalOpen = () => {
        setShowModal(true);
    };
    console.log(directorId, "directorId")
    const handleEditModalOpen = (id) => {
        setDirectorId(id)
        setShowEditModal(true)
    }
    const handleEditModalClose = () => {
        setShowEditModal(false)
    }
    const handleModalClose = () => {
        setShowModal(false);
    };
    const columns = [
        {
            header: "Role",
            field: "role",
        },
        {
            header: "Name",
            field: "name",
        },
        {
            header: "Login Name",
            field: "login_name",
        },
        {
            header: "Phone",
            field: "phone_no",
        },
        {
            header: "Email",
            field: "email",
            width: "20%",
        },
        {
            header: <div className="text-center">Action</div>,
            field: "action",
            width: "12%",
        },
    ];

    const GetAllDirectorEmployees = () => {
        getDirectorEmployees().then((response) => {
            if (response.status === true) {
                console.log(response, "responseemployees")
            } else {
                console.log("There Is Some Error")

            }
        }).catch((error) => {
            console.log(error?.message || "Not able to get Countries");
        })
    }
    useEffect(() => { GetAllDirectorEmployees() }, [])
    const TableData = tableData?.map(user => ({
        id: user.id, // Use the API id
        role: user.type === 1 ? "Director" : "Super Admin", // Map 'type' to 'role', assuming '1' is Director, modify as needed
        name: user.login_name, // Map 'login_name' to 'name'
        loginname: user.login_name, // Assuming 'login_name' should also be used as 'loginname'
        inUsed: "N/A", // You can modify this with relevant information, or leave as "N/A"
        linkWebsites: [], // No website info provided, so leaving it empty
        shareRent: [], // No shareRent info provided, so leaving it empty
        billing: "0", // Assuming default value for billing
        pl: <div className="red-font">0</div>, // Assuming default value for profit/loss
        dw: (
            <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
                D/W
            </button>
        ),
        action: (
            <div className="d-flex flex-center gap-3">
                <SlPencil
                    size={18}
                    className="black-text pointer"
                    onClick={() => handleEditModalOpen(user.id)}
                />
                <MdLockReset
                    size={18}
                    className="black-text pointer"
                // onClick={() => handleResetPasswordOpen(user.id)}
                />
                <MdBlockFlipped
                    size={18}
                    className="black-text pointer"
                // onClick={() => handleBlockUserOpen(user.login_name)}
                />
                <BsEye
                    size={18}
                    className="black-text pointer"
                // onClick={handleNavigateUserDashboard}
                />
            </div>
        ),
    }));
    console.log(tableData, "tableData")
    return (
        <div>
            <div className="flex-between mb-3 mt-2">

                <h6 className="yellow-font mb-0">Add Director Team</h6>
                <div className="d-flex align-items-center">
                    <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
                        <FaSearch size={16} className="grey-clr me-2" />
                        <input className="small-font all-none" placeholder="Search..." />
                    </div>
                    <button
                        className="small-font rounded-pill input-pill blue-font px-3 py-1"
                        onClick={handleModalOpen}
                    >
                        <FaPlus className="me-2" />
                        Add New
                    </button>
                </div>
            </div>

            <Table data={TableData} columns={columns} itemsPerPage={7} />

            <AddDirectorPopup show={showModal} handleClose={handleModalClose} />
            {/* <EditDirectorAdminPopup showEditModal={showEditModal} setShowEditModal={setShowEditModal} handleEditModalClose={handleEditModalClose} directorId={directorId} /> */}


            {/* <ResetPasswordPopup
                resetPasswordPopup={resetPasswordPopup}
                setResetPasswordPopup={handleResetPasswordClose}
                onSubmit={onDirectorResetPassword}
            /> */}

            {/* <ConfirmationPopup
                confirmationPopupOpen={confirmationPopup}
                setConfirmationPopupOpen={setConfirmationPopup}
                discription={`Are you sure you want to block ${selectedUser}?`}
                submitButton="Block"
            /> */}
        </div>)
}

export default AddDirectorTeam