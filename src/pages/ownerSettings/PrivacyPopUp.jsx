import React from 'react'
import { IoClose } from 'react-icons/io5'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const PrivacyPopUp = ({showPrivacyModal,setShowPrivacyModal}) => {
  return (
    <Modal show={showPrivacyModal} onHide={()=>setShowPrivacyModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='small-font'>
           
            <p>
              Welcome to [Company Name]. We value your privacy and are
              committed to protecting your personal information. This privacy
              policy outlines our practices regarding the collection, use, and
              disclosure of your information when you use our services.
            </p>

            <ul>
              <li>
                <strong>Personal Information:</strong> Includes your name,
                email address, phone number, and payment information when you
                register or make a purchase.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                website, products, and services, including IP address, browser
                type, and access times.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking
                technologies to track activity on our service and store certain
                information.
              </li>
            </ul>

      
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process transactions and send you related information</li>
              <li>
                To communicate with you about your account or transactions
              </li>
              <li>To send you marketing communications</li>
              <li>To improve our services and website</li>
            </ul>

         
            <ul>
              <li>
                <strong>Service Providers:</strong> We may employ third-party
                companies to facilitate our services and provide the service on
                our behalf.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required to do so by law or in response to valid
                requests by public authorities.
              </li>
            </ul>

        
            <p>
              We take the security of your personal information seriously and
              implement reasonable measures to protect it. However, please be
              aware that no method of transmission over the Internet or method
              of electronic storage is 100% secure.
            </p>

          
            <ul>
              <li>Access, update, or delete your personal information</li>
              <li>
                Withdraw consent for data processing where applicable
              </li>
              <li>
                Object to or restrict the processing of your data
              </li>
            </ul>

        
            <p>
              We may update our privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page
              and updating the effective date.
            </p>

          
            <p>
              If you have any questions about this privacy policy, please
              contact us at: txchange.com
            </p>
          </div>
        </Modal.Body>
       
      </Modal>
  )
}

export default PrivacyPopUp