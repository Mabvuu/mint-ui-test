
import React, { useState } from "react";
import contractJson from "../abi/MyContract.json"; 

const contractAbi = contractJson.abi;


export default function Main() {
  const [txStatus, setTxStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleMint = () => {
    console.log("handleMint clicked");
    console.log("Contract ABI length:", contractAbi.length); 


    setTxStatus("confirm");

   
    setTimeout(() => {
      setTxStatus("pending");

     
      setTimeout(() => {
      
        if (Math.random() < 0.8) {
          setTxStatus("success");
        } else {
          setTxStatus("error");
          setErrorMsg("Simulated transaction failure");
        }
      }, 2000);
    }, 1000);
  };

  const renderStatus = () => {
    switch (txStatus) {
      case "confirm":
        return <div className="alert alert-info">🔒 Please confirm in your wallet…</div>;
      case "pending":
        return (
          <div className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            <span>⏳ Transaction pending…</span>
          </div>
        );
      case "success":
        return <div className="alert alert-success">✅ Minted!</div>;
      case "error":
        return <div className="alert alert-danger">❌ Error: {errorMsg}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="hero border-1 pb-3">
      <div className="card bg-dark text-white border-0 mx-3">
        <img
          className="card-img img-fluid"
          src="/assets/main.jpg"
          alt="Card"
          style={{ height: 500, objectFit: "cover" }}
        />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container text-center">
            <h5 className="card-title fs-1 fw-lighter">New Season Arrivals</h5>
            <p className="card-text fs-5 d-none d-sm-block">
              This is a wider card with supporting text below...
            </p>

            {/* Status UI */}
            {renderStatus()}

            {/* Mint button */}
            <button
              onClick={handleMint}
              className="btn btn-primary mt-3"
              disabled={txStatus === "confirm" || txStatus === "pending"}
            >
              Mint NFT (Mock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
