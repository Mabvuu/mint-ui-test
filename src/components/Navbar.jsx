import React, { useState, useEffect } from 'react'
import { providers } from 'ethers'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NETWORK_NAMES = {
  '0x1': 'Ethereum',
  '0x89': 'Polygon',
  '0xaa36a7': 'Sepolia',
  // add others if needed
}

const Navbar = () => {
  const cart = useSelector(state => state.handleCart)
  const [account, setAccount] = useState(null)
  const [network, setNetwork] = useState(null)

  // On load: get account & network, and subscribe to chain changes
  useEffect(() => {
    if (!window.ethereum) return

    const provider = new providers.Web3Provider(window.ethereum)

    // load initial accounts
    provider.listAccounts().then(accs => {
      if (accs.length > 0) {
        setAccount(accs[0])
      }
    }).catch(console.error)

    // load initial network
    provider.getNetwork().then(net => {
      const hex = '0x' + net.chainId.toString(16)
      setNetwork(NETWORK_NAMES[hex] || hex)
    }).catch(console.error)

    // handler for network changes
    const handleChainChanged = (chainId) => {
      setNetwork(NETWORK_NAMES[chainId] || chainId)
    }

    window.ethereum.on('chainChanged', handleChainChanged)
    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask')
      return
    }

    try {
      const provider = new providers.Web3Provider(window.ethereum)
      // request connection
      const accounts = await provider.send('eth_requestAccounts', [])
      if (accounts.length > 0) {
        setAccount(accounts[0])
      }

      // update network name
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setNetwork(NETWORK_NAMES[chainId] || chainId)
    } catch (err) {
      console.error('connectWallet error', err)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setNetwork(null)
  }

  // safely abbreviate only if account is a string
  const abbr = typeof account === 'string'
    ? `${account.slice(0, 6)}…${account.slice(-4)}`
    : ''

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          React Ecommerce
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Nav links */}
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>

          {/* Wallet + network + other buttons */}
          <div className="d-flex align-items-center flex-nowrap">
            {account ? (
              <button
                onClick={disconnectWallet}
                className="btn btn-outline-dark mx-1 d-flex align-items-center"
              >
                <img
                  src="/images/1.png"
                  alt="MetaMask"
                  style={{ width: '18px', marginRight: '5px' }}
                />
                {abbr}
                {network && (
                  <span style={{ marginLeft: '8px', fontSize: '0.9em' }}>
                    [{network}]
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="btn btn-outline-dark mx-1 d-flex align-items-center"
              >
                <img
                  src="/images/1.png"
                  alt="MetaMask"
                  style={{ width: '18px', marginRight: '5px' }}
                />
                Connect Wallet
              </button>
            )}
            <NavLink to="/login"   className="btn btn-outline-dark mx-1">Login</NavLink>
            <NavLink to="/register" className="btn btn-outline-dark mx-1">Register</NavLink>
            <NavLink to="/cart"     className="btn btn-outline-dark mx-1">
              Cart ({cart.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
