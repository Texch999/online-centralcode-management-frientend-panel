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
import { directorEmployees } from '../../utils/enum'
import ResetPasswordPopup from '../popups/ResetPasswordPopup'

function AddDirectorTeam() {
    const role = localStorage.getItem("role_code")

    const [tableData, setTableData] = useState()
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState()
    const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
    const [confirmationPopup, setConfirmationPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [directorEmployeeId, setdirectorEmployeeId] = useState()
    console.log(directorEmployeeId, "directorEmployeeId")
    const handleModalOpen = () => {
        setShowModal(true);
    };
    const handleEditModalOpen = (id) => {
        setdirectorEmployeeId(id)
        setShowEditModal(true)
    }
    const handleResetPasswordPopup = () => {
        setResetPasswordPopup(true)
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
        getDirectorEmployees({ limit: 10, offset: 0 }).then((response) => {
            if (response.status === true) {
                console.log(response.data, "responseemployees")
                setTableData(response.data)
            } else {
                console.log("There Is Some Error")

            }
        }).catch((error) => {
            console.log(error?.message || "Not able to get Countries");
        })
    }
    useEffect(() => { GetAllDirectorEmployees() }, [])
    const TableData = tableData?.map(user => ({
        id: user.id,
        role: directorEmployees[user.role] || "Unknown Role", // Mapping role from directorEmployees
        name: user.name,
        login_name: user.login_name,
        phone_no: user.phone_no,
        email: user.email,

        action: (
            <div className="d-flex flex-center gap-3">
                <SlPencil
                    size={18}
                    className="black-text pointer"
                    onClick={() => handleEditModalOpen(user.id)}
                />
                <MdLockReset size={18} className="black-text pointer" onClick={() => handleResetPasswordPopup(user.id)} />
                <MdBlockFlipped size={18} className="black-text pointer" />
            </div>
        ),
    }));

    const onDirectorResetPassword = () => {
        console.log("hi")
    }
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


            <ResetPasswordPopup
                resetPasswordPopup={resetPasswordPopup}
                setResetPasswordPopup={setResetPasswordPopup}
                onSubmit={onDirectorResetPassword}
            />

            {/* <ConfirmationPopup
                confirmationPopupOpen={confirmationPopup}
                setConfirmationPopupOpen={setConfirmationPopup}
                discription={`Are you sure you want to block ${selectedUser}?`}
                submitButton="Block"
            /> */}
        </div>)
}

export default AddDirectorTeam