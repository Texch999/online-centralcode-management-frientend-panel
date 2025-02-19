import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Images } from "../../images";
import {
    getNotificationsforDirector,
    getNotificationsforManagement
} from "../../api/apiMethods";

const id = localStorage.getItem("user_id");
const role = localStorage.getItem("role_code");

const NotificationsPopup = ({
    notificationPopup,
    setNotificationPopup
}) => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    
    const handleClose = () => {
        setNotificationPopup(false);
    };
    
    const getAllNotificationsToDir = () => {
        getNotificationsforDirector()
            .then((response) => {
                setNotifications(response?.data);
                
            })
            .catch((error) => {
                setError(error?.message);
            });
    };
    
    const getAllNotificationsToMan = () => {
        getNotificationsforManagement()
            .then((response) => {
                setNotifications(response?.data);
            })
            .catch((error) => {
                setError(error?.message);
            });
    };
    
    useEffect(() => {
        if (role === "director") {
            getAllNotificationsToDir();
        }
        else if (role === "management") {
            getAllNotificationsToMan();
        }
    }, []);

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Determine notification icon color based on notification ID
    const getIconColor = (id) => {
        const colors = ["#36b4e5", "#a15eff", "#ff9f10", "#4caf50"];
        return colors[id % colors.length];
    };

    const renderIcon = (color) => {
        return (
            <div className="d-flex align-items-center justify-content-center me-3"
                style={{ backgroundColor: color, width: "32px", height: "32px", borderRadius: "4px" }}>
                <i className="bi bi-bell-fill text-white"></i>
            </div>
        );
    };

    const modalStyle = {
        top: '62px',
        left: '73%',
        bottom: 'auto',
        width: '420px'
    };

    return (
        <Modal
            show={notificationPopup}
            onHide={handleClose}
            dialogClassName="position-absolute m-0"
            contentClassName="border-0 shadow"
            style={modalStyle}
            backdrop={false}
        >
            <Modal.Header className="py-2 px-3" style={{ backgroundColor: "#ff9f10", color: "white" }}>
                <Modal.Title className="fs-6 fw-bold">Notifications</Modal.Title>
                <button type="button" className="btn-close btn-close-white" onClick={handleClose} aria-label="Close"></button>
            </Modal.Header>
            <Modal.Body className="p-0" style={{ minHeight: "550px", backgroundColor: "#f8f9fa" }}>
                <div className="d-flex flex-column align-items-stretch">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} className="d-flex align-items-start p-3 bg-white mb-1">
                                {renderIcon(getIconColor(notification.id))}
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <span className="fw-medium text-dark">Notification #{notification.id}</span>
                                        {notification.is_read === 0 && (
                                            <span className="rounded-circle"
                                                style={{ backgroundColor: "#ff9f10", width: "8px", height: "8px", display: "inline-block" }}></span>
                                        )}
                                    </div>
                                    <p className="mb-0 text-secondary small">{notification.description}</p>
                                    <small className="text-secondary">{formatDate(notification.created_date)}</small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center p-3 mb-1" style={{ minHeight: "350px" }}>
                            <div className="mb-4 bg-light rounded-circle p-4 d-flex justify-content-center align-items-center" style={{ width: "350px", height: "50px" }}>
                                <div className="position-relative" style={{ width: "90px", height: "90px" }}>
                                    {/* Small arrow icons around box */}
                                    <div className="position-absolute" style={{ top: "5px", left: "35px", width: "18px", height: "18px", opacity: 0.4 }}>
                                        <i className="bi bi-arrow-up text-secondary"></i>
                                    </div>
                                    <div className="position-absolute" style={{ bottom: "5px", left: "55px", width: "18px", height: "18px", opacity: 0.4 }}>
                                        <i className="bi bi-arrow-down text-secondary"></i>
                                    </div>
                                    <div className="position-absolute" style={{ top: "30px", right: "0px", width: "18px", height: "18px", opacity: 0.4 }}>
                                        <i className="bi bi-arrow-right text-secondary"></i>
                                    </div>
                                </div>  
                            </div>

                            {/* Centered text */}
                            {/* <div className="text-center">
                                <img src={Images.emptyNotifications} className="not-img" alt="no notifications" style={{ width: '250px', height: 'auto' }} />
                                <h5 className="fw-bold text-dark mb-1">No Messages yet</h5>
                                <p className="text-secondary small mb-0">Check back later</p>
                            </div> */}
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default NotificationsPopup;