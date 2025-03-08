import React from "react";

function AddProduct() {
  return (
    <div style={{height: "98vh"}}>
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
          <h6 className="pt-2">
            <small>Product</small>
          </h6>
          <h6 className="pt-2">
            <small>/</small>
          </h6>
          <h6 className="pt-2">
            <small>Add</small>
          </h6>
        </div>
      </div>

      <div className="container">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-success fw-bold">Add New Product</h2>
          <form>
            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Product Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
              />
            </div>

            {/* Product Company Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Company Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter company name"
              />
            </div>

            {/* Product Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold">Product Image:</label>
              <input type="file" className="form-control" accept="image/*" />
            </div>

            {/* Product Prices */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Before Discount Price:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price before discount"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  After Discount Price:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price after discount"
                />
              </div>
            </div>

            {/* Product Quantity & Discount */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product quantity"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Discount (%):</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter discount percentage"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-3">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
