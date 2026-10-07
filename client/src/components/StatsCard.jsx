import React from 'react'
import './../style/statscard.css'
function StatsCard({ title, value, color, icon }) {
  return (
    <div className='stats-card' style={{ backgroundColor: color }}>
      <div className='stats-info'>
        <div className='stats-text'>
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className='stats-icon'>
          {icon}
        </div>
      </div>
    </div>
  )
}
export default StatsCard
