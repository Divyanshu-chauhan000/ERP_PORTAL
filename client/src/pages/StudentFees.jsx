import React from "react";
import "../style/studentFees.css";

const feeMonths = [
  {
    month: "April",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Paid",
    due: 0,
  },
  {
    month: "May",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Paid",
    due: 0,
  },
  {
    month: "June",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Due",
    due: 14300,
  },
  {
    month: "July",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "August",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "September",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "October",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "November",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "December",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "January",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "February",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
  {
    month: "March",
    tuition: 12000,
    transport: 1800,
    other: 500,
    total: 14300,
    status: "Upcoming",
    due: 14300,
  },
];

const feeBreakdown = [
  { head: "Tuition Fee", annual: 144000, paid: 132000, pending: 12000 },
  { head: "Admission & Registration", annual: 18000, paid: 18000, pending: 0 },
  { head: "Transport", annual: 21600, paid: 18000, pending: 3600 },
  { head: "Lab / Practical", annual: 9000, paid: 6000, pending: 3000 },
  { head: "Library", annual: 4000, paid: 3000, pending: 1000 },
  { head: "Exam & Activities", annual: 8000, paid: 6000, pending: 2000 },
];

const paymentHistory = [
  { date: "2026-04-08", amount: 14300, mode: "UPI", receipt: "RCPT-APR-001" },
  {
    date: "2026-05-08",
    amount: 14300,
    mode: "Net Banking",
    receipt: "RCPT-MAY-004",
  },
  { date: "2026-06-05", amount: 0, mode: "-", receipt: "Due" },
];

const totalSessionFee = feeMonths.reduce((sum, month) => sum + month.total, 0);
const totalPaid = 28600;
const totalPending = totalSessionFee - totalPaid;
const nextDueMonth =
  feeMonths.find((month) => month.status === "Due") || feeMonths[2];
const discount = 2500;
const lateFee = 350;

function StudentFees() {
  return (
    <div className="fees-page">
      <header className="fees-header">
        <div>
          <p className="eyebrow">Academic Session: 2026-27</p>
          <h1>My Fees</h1>
        </div>
        <div className="student-meta">
          <h2>Aarav Sharma</h2>
          <p>Class 8 • Section A</p>
        </div>
      </header>

      <section className="summary-row">
        <div className="summary-card">
          <label>Total Session Fee</label>
          <p>₹{totalSessionFee.toLocaleString("en-IN")}</p>
        </div>
        <div className="summary-card">
          <label>Total Paid</label>
          <p>₹{totalPaid.toLocaleString("en-IN")}</p>
        </div>
        <div className="summary-card">
          <label>Total Pending</label>
          <p>₹{totalPending.toLocaleString("en-IN")}</p>
        </div>
        <div className="summary-card highlight">
          <label>Next Due</label>
          <p>₹{nextDueMonth.due.toLocaleString("en-IN")}</p>
          <small>{nextDueMonth.month} 10</small>
        </div>
      </section>

      <section className="fees-panel">
        <div className="panel-head">
          <h3>Monthly Fee Status</h3>
          <span>Apr to Mar</span>
        </div>

        <div className="fees-table-wrap">
          <table className="fees-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Tuition</th>
                <th>Transport</th>
                <th>Other</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feeMonths.map((entry) => (
                <tr key={entry.month}>
                  <td>{entry.month}</td>
                  <td>₹{entry.tuition.toLocaleString("en-IN")}</td>
                  <td>₹{entry.transport.toLocaleString("en-IN")}</td>
                  <td>₹{entry.other.toLocaleString("en-IN")}</td>
                  <td>₹{entry.total.toLocaleString("en-IN")}</td>
                  <td>
                    <span
                      className={`status-badge ${entry.status.toLowerCase()}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td>
                    {entry.status === "Paid" || entry.status === "Upcoming" ? (
                      <button className="table-action disabled" disabled>
                        {entry.status === "Paid" ? "Paid" : "—"}
                      </button>
                    ) : (
                      <button className="table-action">Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="two-column">
        <section className="fees-panel">
          <div className="panel-head">
            <h3>Fee Breakdown</h3>
          </div>

          <div className="breakdown-list">
            {feeBreakdown.map((item) => (
              <div key={item.head} className="breakdown-row">
                <div className="row-label">
                  <span>{item.head}</span>
                </div>
                <div className="row-value">
                  <strong>₹{item.annual.toLocaleString("en-IN")}</strong>
                </div>
                <div className="row-meta">
                  <span className="breakdown-bullet paid">
                    Paid ₹{item.paid.toLocaleString("en-IN")}
                  </span>
                  <span className="breakdown-bullet pending">
                    Due ₹{item.pending.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="fees-panel">
          <div className="panel-head">
            <h3>Discounts & Late Fees</h3>
          </div>

          <div className="amount-boxes">
            <div className="amount-box">
              <span>Scholarship</span>
              <strong>₹{discount.toLocaleString("en-IN")}</strong>
            </div>
            <div className="amount-box danger">
              <span>Late Fee</span>
              <strong>₹{lateFee.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="fees-panel">
        <div className="panel-head">
          <h3>Payment History</h3>
        </div>

        <div className="history-list">
          {paymentHistory.map((entry) => (
            <div key={entry.receipt} className="history-row">
              <div>
                <strong>
                  {new Date(entry.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
                <small>{entry.mode}</small>
              </div>
              <div>
                <strong>₹{entry.amount.toLocaleString("en-IN")}</strong>
              </div>
              <div>
                <span>{entry.receipt}</span>
              </div>
              <div>
                <button className="download-link">Download Receipt</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="footer-note">
        Fees are due by the 10th of every month. Contact the accounts office for
        queries.
      </div>
    </div>
  );
}

export default StudentFees;
