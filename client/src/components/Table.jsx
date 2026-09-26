import React from 'react'
import './../style/table.css'

function Table({ title, columns, data, actionButtons }) {
  return (
    <div className='table-container'>
      <div className='table-header'>
        <h3>{title}</h3>
        <a href="#" className='view-link'>View all</a>
      </div>

      <table className='data-table'>
       <thead>
         <tr>
          {
            columns.map((col) =>{
             return  <th key={col.key}>{col.label}</th>
            })
          }
          {
            actionButtons && <th>Actions</th>
          }
         </tr>
       </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actionButtons && (
                  <td className='action-cell'>
                    {actionButtons.map((btn) => (
                      <button 
                        key={btn.label}
                        onClick={() => btn.onClick(row)}
                        className={`action-btn ${btn.style}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actionButtons ? 1 : 0)} className='no-data'>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}

export default Table
