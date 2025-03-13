import React from "react";

function ManageAdd() {
  const data = [
    {
      id: 3,

      url: "https://utkarshagro.com/cdn/shop/articles/WhatsApp-Image-2021-09-02-at-6.13.49-PM.jpg?v=1684492397",
    },
    {
      id: 2,

      url: "https://utkarshagro.com/cdn/shop/articles/Artboard_1_92.png?crop=center&height=2048&v=1732538640&width=2048",
    },
    {
      id: 1,
      url: "https://utkarshagro.com/cdn/shop/articles/1_58_1.png?v=1723458851",
    },
    {
      id: 6,
      url: "https://utkarshagro.com/cdn/shop/articles/WhatsApp-Image-2022-07-29-at-11.20.32-AM-1.jpg?v=1684481218",
    },
  ];
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
            <small>Manage Ads</small>
          </h6>
        </div>
      </div>

      <div className="d-flex gap-4">
        {/* Add New Ad */}
        <div className="p-2 m-6 bg-white rounded" style={{ width: "500px" }}>
          <h3 className="text-success fw-bold text-center">Upload New Add</h3>
          <div className="row mb-3">
            {/* Product Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold">Product Image:</label>
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
          <h3 className="text-danger fw-bold text-center">Delete Add</h3>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 ">
              <label className="form-label fw-bold">Enter Add Id : </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter quantity"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="d-flex justify-content-evenly mt-3">
            <button type="reset" className="btn btn-secondary">
              Clear
            </button>
            <button type="submit" className="btn btn-success">
              Delete
            </button>
          </div>
        </div>
      </div>
      <br />
      <h2 className="text-center text-primary fw-bold">Running Ads</h2>
      {/* Uploaded Ads */}
      <div className="container p-4  bg-white rounded">
        <div className="row ">
          {data.map((item, index) => (
            <div key={item.id} className="col-lg-2 w-50 mb-3 d-flex ">
              <div className="text-center">
                <h6>
                  <small>{item.id}</small>
                </h6>
                <img
                  src={item.url}
                  className="w-100 rounded"
                  alt="Uploaded Ad"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageAdd;
