import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import "./SupportRequest.css"; // Adjust the path if needed

function SupportRequest() {
  const [helpRequests, sethelpRequests] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const helpMessages = [
    "Hello! How can I assist you today?",
    "Thank you for reaching out. We will get back to you shortly!",
    "Your request is being processed. Please allow us some time.",
    "We appreciate your patience. Our support team is working on your issue.",
    "For order updates, please check your email or order history.",
    "If you need urgent assistance, please contact our support team.",
    "We value your feedback. Let us know how we can improve!",
    "Thank you for choosing us! Let us know if you need any help.",
  ];

  // Function to copy only the selected message
  const copyToClipboard = () => {
    if (!selectedMessage) return; // Prevent copying if no message is selected
    navigator.clipboard.writeText(selectedMessage); // Copy only selected message
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await Axios().get(`/admin/ViewHelpCenterList`);
        sethelpRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHelpRequests();
  }, []);

  return (
    <div>
      {/* Header */}
      <div
        style={{ height: "65px" }}
        className="d-flex justify-content-end gap-2 text-dark py-3 border rounded-4 bg-white w-100 top-0"
      >
        <h4
          className="text-success fw-bold pl-20"
          style={{ fontFamily: "Poppins, sans-serif", color: "#28a745" }}
        >
          Empowering Farmers, Growing Futures 🌱🚜
        </h4>

        <img
          src="https://ih1.redbubble.net/image.2309256735.3062/st,small,507x507-pad,600x600,f8f8f8.u1.jpg"
          className="rounded-circle float-end"
          style={{ width: "40px", marginLeft: "30vh", height: "auto" }}
        ></img>
        <i class="fa-solid fa-bell fa-2x text-success-emphasis"></i>
        <i class="fa-solid fa-circle-user fa-2x text-info"></i>
        <h6 className="pt-2 pe-2">Admin</h6>
      </div>

      {/* Main Content */}
      <div className="d-flex justify-content-between p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="pt-2">
            <small>Help Desk</small>
          </h6>
          <h6 className="pt-2">
            <small>/</small>
          </h6>
          <h6 className="pt-2">
            <small>Support Requests</small>
          </h6>
        </div>

        {/* Button to Open Popup */}
        <button
          style={{ width: "150px" }}
          className="p-2 m-1 rounded bg-primary text-white border-0"
          onClick={() => setIsPopupOpen(true)}
        >
          Message Helper
        </button>
      </div>
      {/* Floating Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content w-50">
            {/* Close Button */}
            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
              &times;
            </button>

            {/* Dropdown to Select a Message */}
            <h4>Select a Reply Message</h4>
            <select
              className="popup-select"
              onChange={(e) => setSelectedMessage(e.target.value)}
              value={selectedMessage}
            >
              <option value="">-- Select a Message --</option>
              {helpMessages.map((message, index) => (
                <option key={index} value={message}>
                  {message}
                </option>
              ))}
            </select>

            {/* Textarea with Selected Message */}
            <textarea
              className="popup-textarea"
              value={selectedMessage}
              readOnly
            ></textarea>

            {/* Copy Button */}
            <button
              className="copy-btn"
              onClick={copyToClipboard}
              disabled={!selectedMessage}
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="container ">
        {helpRequests.length > 0 ? (
          <div className=" help-requests-container">
            {helpRequests.map((request, index) => (
              <div
                key={index}
                className=" bg-white rounded p-4 help-request-box mb-4"
              >
                <h6>
                  <small>{index + 1}</small>
                </h6>
                <h5>
                  <b>Name: {request.username}</b>
                </h5>
                <h6>Email: {request.email}</h6>

                <h4>Query</h4>
                <p className="border rounded-2 p-2 help-query">
                  {request.description}
                </p>

                <h4>Reply </h4>
                <textarea
                  className="p-2 rounded reply-box"
                  rows="4"
                  cols="50"
                  placeholder="Enter Message Here..."
                ></textarea>
                <br />
                <button
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#228b22",
                    color: "#fff",
                  }}
                >
                  Send
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No help requests found.</p>
        )}
      </div>
    </div>
  );
}

export default SupportRequest;
