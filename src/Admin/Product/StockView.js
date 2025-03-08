import React, { useState } from "react";

function StockView() {
    
    const [products, setProducts] = useState([
        {
          id: 4,
          name: "Crystal Gramoxone",
          company: "Crystal Crop Protection",
          price: 910,
          discount: 48,
          afterDiscount: 472,
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/kvoad4qywitr4c95rse8.jpg",
          category: "pesticide",
          quantity: 76,
        },
        {
          id: 6,
          name: "PLANFIX PLant",
          company: "BAYER",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/pdyfcvxz647zvm9io3ia.jpg",
          category: "pesticide",
        },
        {
          id: 8,
          name: "BIOVITA LIQUID",
          company: "PL Industries",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738492553/giqjkaarzbpxbyb2pxu8.jpg",
          category: "bio-fertilizer",
        },
        {
          id: 9,
          name: "ORGANIC MARINE",
          company: "JANATHA AGRO",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/t9wzddcwvrlco4stz4cy.jpg",
          category: "nutrient",
        },
        {
          id: 11,
          name: "RALLIGOLD GR",
          company: "TATA RALLIS",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494666/g2im5fnjyel4javl7sdu.jpg",
          category: "bio-fertilizer",
        },
        {
          id: 12,
          name: "NALPAK LIQUID",
          company: "MULTIPLEX",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494673/o76r4rlial3jnczjyuax.png",
          category: "bio-fertilizer",
        },
        {
          id: 13,
          name: "Samridhi Azotobacter",
          company: "JAIPUR BIO",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494670/ugrhz8gvmizggghh4kaz.jpg",
          category: "bio-fertilizer",
        },
        {
          id: 14,
          name: "EBS KMB POTASH",
          company: "ESSENTIAL BIO",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494672/xy5q69p62jhouayqni3k.jpg",
          category: "bio-fertilizer",
        },
        {
          id: 16,
          name: "AMRUTH ADVEN",
          company: "AMRUTH ORGANIC",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494664/chgzxdln9luvs3dhox4q.jpg",
          category: "bio-fertilizer",
        },
        {
          id: 17,
          name: "MR RAJA",
          company: "BHUMI AGRO",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494665/bdagouiypevvetzndl6n.jpg",
          category: "bio-fertilizer",
        },
        {
          id: 18,
          name: "HUMIC ACID",
          company: "KATYAYANI ORGAN",
          image:
            "https://res.cloudinary.com/dtsdammma/image/upload/v1738494665/zrbxo9yawdaw25dclro0.jpg",
          category: "bio-fertilizer",
        },
      ]);
      


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
          <h6 className="pt-2">
            <small>Product</small>
          </h6>
          <h6 className="pt-2">
            <small>/</small>
          </h6>
          <h6 className="pt-2">
            <small>Stock</small>
          </h6>
        </div>
      </div>
      <div className="container">
        <div>
        <h2 className="text-center text-danger fw-bold bg-white rounded p-2">Out Of Stock Product</h2>

        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  width: "250px", // Fixed width for uniform size
                  minHeight: "300px", // Ensures all cards have the same height
                  padding: "18px",
                  border: "2px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                  margin: "auto",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "150px",
                    height: "150px", // Ensuring all images are the same size
                    objectFit: "cover", // Keeps aspect ratio without distortion
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <div className="card-body" style={{ flexGrow: 1 }}>
                  <p className="fw-bold">ID: {product.id}</p>
                  <h5>{product.name}</h5>
                  <h5 className="text-danger">Out of Stock</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default StockView;
