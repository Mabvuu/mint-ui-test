// src/pages/Home.js
import React, { useState } from "react"
import { Navbar, Main, Product, Footer } from "../components"

function Home() {
  const [txStatus, setTxStatus] = useState(null)

  // small component to display status
  const StatusBar = () => {
    if (txStatus === "confirm") {
      return <div className="alert alert-info text-center">🔔 Confirm in wallet…</div>
    }
    if (txStatus === "pending") {
      return (
        <div className="alert alert-warning text-center">
          <span className="spinner-border spinner-border-sm mr-2" role="status"></span>
          Transaction pending…
        </div>
      )
    }
    if (txStatus === "success") {
      return <div className="alert alert-success text-center">✅ Minted!</div>
    }
    return null
  }

  return (
    <>
      <Navbar />
      {/* show status messages here */}
      <StatusBar />
      {/* pass setTxStatus to Main and Product */}
      <Main setTxStatus={setTxStatus} />
      <Product setTxStatus={setTxStatus} />
      <Footer />
    </>
  )
}

export default Home
