import React from 'react'
import { FaSearch } from 'react-icons/fa'

const DownlineTrasactionHistory = () => {
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font medium-font mb-0">Downline List</h6>
        <div className="d-flex flex-between w-30">
          <div>
            <select className="input-pill rounded-pill px-5">
              <option>All</option>
            </select>
          </div>
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-60">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownlineTrasactionHistory
