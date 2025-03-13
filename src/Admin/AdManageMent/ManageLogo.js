import React from "react";
import logo from "../../assets/images/AgriVision (8).png"; // Import the image

function ManageLogo() {
  return (
    <div >
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
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">
            <small>Add Management</small>
          </h6>
          <h6 className="">
            <small>/</small>
          </h6>
          <h6 className="">
            <small>Manage Logo</small>
          </h6>
        </div>
      </div>

      <div className="d-flex gap-4">
        {/* Add New Ad */}
        <div className="p-2 m-6 bg-white rounded" style={{ width: "500px" }}>
          <h3 className="text-success fw-bold text-center">Upload New Logo</h3>
          <div className="row mb-3">
            {/* Product Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold">Logo Image:</label>
              <input type="file" className="form-control" accept="image/*" />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-evenly mt-3">
            <button type="reset" className="btn btn-secondary">
              Clear
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
        {/* Delete Ad */}
        <div className="p-2 bg-white rounded " style={{ width: "400px" }}>
          <h3 className="text-danger fw-bold text-center">Delete Logo</h3>
          {/* Buttons */}
          <div className="d-flex justify-content-evenly mt-3">
            <button type="submit" className="btn btn-success">
              Delete
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h2 className="text-center text-primary fw-bold">Running Logo</h2>
      {/* Uploaded Ads */}
      <div className=" p-4 rounded justify-content-center">
        <div className="text-center">
          <img src={logo} className="w-25 rounded" alt="Uploaded Ad" />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ManageLogo;
