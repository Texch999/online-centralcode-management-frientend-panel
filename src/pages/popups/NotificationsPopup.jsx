import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Images } from "../../images";
import { BsBarChartFill } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa6";
import {
    readNotificationsforDirector,
    readNotificationsforManagement
} from "../../api/apiMethods";


const NotificationsPopup = ({
    notificationPopup,
    setNotificationPopup,
    notifications,
    fetchAllNotificationsToMan,
    fetchAllNotificationsToDir

}) => {

    const [error, setError] = useState("");
    const [notificationId, setNotificationId] = useState(null);
    const [readId, setReadId] = useState(null);
    const role = localStorage.getItem("role_name");


    const handleClose = () => {
        setNotificationPopup(false);
    };


    // Helper function to format date

    const readNotificationsStatusToDirector = async (id, read_id) => {
        try {
            const response = await readNotificationsforDirector(id, read_id);
            if (response?.status === true) {
                fetchAllNotificationsToDir();
            } else {
                setError("Something went wrong");
            }
        } catch (error) {
            setError(error?.message);
        }
    };
    
    const readNotificationsStatusToMan = async (id, read_id) => {
        try {
            const response = await readNotificationsforManagement(id, read_id);
            if (response?.status === true) {
                fetchAllNotificationsToMan();
            } else {
                setError("Something went wrong");
            }
        } catch (error) {
            setError(error?.message);
        }
    };

    const handleReadNotification = (id, read_id) => {
        if (role === "director") {
            readNotificationsStatusToDirector(id, read_id);
        } else if (role === "management") {
            readNotificationsStatusToMan(id, read_id);
        }
    };

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

    const renderIcon = (notification) => {
        const isRead = notification.is_read !== 2;

        if (isRead) {
            return (
                <div className="notification-icon notification-icon-read d-flex align-items-center justify-content-center me-3">
                    <BsBarChartFill style={{ color: "#36b4e5", fontSize: "16px" }} />
                </div>
            );
        } else {
            return (
                <div className="notification-icon notification-icon-unread d-flex align-items-center justify-content-center me-3">
                    <FaRegBell style={{ color: "#7952b3", fontSize: "18px" }} />
                </div>
            );
        }
    };

    const getModalStyle = () => {
        // Using window.innerWidth for responsive positioning
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

        if (screenWidth <= 576) {
            // Mobile view - full width at bottom of screen
            return {
                bottom: '0',
                left: '0',
                right: '0',
                top: 'auto',
                width: '100%',
                maxHeight: '80vh',
                margin: '0'
            };
        } else if (screenWidth <= 992) {
            // Tablet view - positioned right with reduced width
            return {
                top: '62px',
                right: '10px',
                left: 'auto',
                bottom: 'auto',
                width: '320px',
                maxHeight: '550px'
            };
        } else {
            // Desktop view - original positioning
            return {
                top: '62px',
                right: '10px',
                left: 'auto',
                bottom: 'auto',
                width: '370px',
                maxHeight: '550px'
            };
        }
    };

    // State to track window size
    const [modalStyle, setModalStyle] = useState(getModalStyle());

    // Update modal style on window resize
    useEffect(() => {
        const handleResize = () => {
            setModalStyle(getModalStyle());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="notifications-popup-container">

            <Modal
                show={notificationPopup}
                onHide={handleClose}
                dialogClassName="position-absolute m-0"
                contentClassName="border-0 shadow"
                style={modalStyle}
                backdrop={false}
                className="notifications-popup-container"
            >
                <Modal.Header className="py-2 px-3" style={{ backgroundColor: "#ff9f10", color: "white" }}>
                    <Modal.Title className="fs-6 fw-bold">Notifications</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" onClick={handleClose} aria-label="Close"></button>
                </Modal.Header>
                <Modal.Body className="p-0" style={{ backgroundColor: "#f8f9fa", overflowY: "auto" }}>
                    <div className="d-flex flex-column align-items-stretch">
                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className="notification-item d-flex align-items-start p-3 bg-white mb-1" onClick={() => handleReadNotification(notification.id, notification.is_read)}>
                                    {renderIcon(notification)}
                                    <div className="notification-content flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <span className="fw-medium text-dark">Notification #{notification.id}</span>
                                            {notification.is_read === 2 && (
                                                <span className="notification-indicator"></span>
                                            )}
                                        </div>
                                        <p className="notification-description mb-0 text-secondary small">{notification.description}</p>
                                        <small className="text-secondary">{formatDate(notification.created_date)}</small>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-notifications-container d-flex flex-column align-items-center justify-content-center p-3 mb-1">
                                <div className="mb-4 bg-light rounded-circle p-4 d-flex justify-content-center align-items-center" style={{ width: "100%", maxWidth: "350px", height: "50px" }}>
                                    <div className="position-relative" style={{ width: "1500px", height: "90px" }}>
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
                                <div className="text-center">
                                    <img src={Images.emptyNotifications} className="empty-notifications-image" alt="no notifications" />
                                    <h5 className="fw-bold text-dark mb-1">No Messages yet</h5>
                                    <p className="text-secondary small mb-0">Check back later</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NotificationsPopup;