import React, { useState, useMemo } from "react";
import "../style/attendance.css";

const DUMMY_FEES = [];

const MONTHLY_COLLECTION = [
  { month: "April", target: 500000, collected: 480000, pending: 20000, pct: 96 },
  { month: "May", target: 500000, collected: 450000, pending: 50000, pct: 90 },
  { month: "June", target: 500000, collected: 490000, pending: 10000, pct: 98 },
];

const RECENT_TRANSACTIONS = [];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export default function Fees() {
  const [session, setSession] = useState("2026-27");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  
  const [fees, setFees] = useState(DUMMY_FEES);
  const [collectModal, setCollectModal] = useState({ isOpen: false, student: null });
  const [paymentForm, setPaymentForm] = useState({ amount: "", mode: "UPI" });

  const filteredFees = useMemo(() => {
    return fees.filter(f => {
      const matchClass = classFilter === "All" || f.classSection.includes(`Class ${classFilter} -`);
      const matchSection = sectionFilter === "All" || f.classSection.includes(`- ${sectionFilter}`);
      const matchStatus = statusFilter === "All" || f.status === statusFilter;
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.rollNo.toString() === search || f.id.toString() === search;
      return matchClass && matchSection && matchStatus && matchSearch;
    });
  }, [fees, classFilter, sectionFilter, statusFilter, search]);

  const stats = useMemo(() => {
    const collectedToday = 125000; // Dummy static for today
    const collectedMonth = 450000;
    const targetMonth = 500000;
    const monthPct = Math.round((collectedMonth / targetMonth) * 100);
    const totalPending = fees.reduce((acc, curr) => acc + curr.pending, 0);
    const overdueCount = fees.filter(f => f.status === "Overdue").length;
    
    return { collectedToday, collectedMonth, monthPct, totalPending, overdueCount };
  }, [fees]);

  const overdueStudents = useMemo(() => {
    return [...fees].filter(f => f.status === "Overdue" && f.daysOverdue > 10).sort((a,b) => b.pending - a.pending).slice(0, 5);
  }, [fees]);

  const openCollectModal = (student = null) => {
    setCollectModal({ isOpen: true, student });
    setPaymentForm({ amount: student ? student.pending : "", mode: "UPI" });
  };

  const handleCollectSave = () => {
    if (collectModal.student) {
      setFees(fees.map(f => f.id === collectModal.student.id ? { ...f, paid: f.totalFee, pending: 0, status: "Paid" } : f));
    }
    setCollectModal({ isOpen: false, student: null });
    alert("Payment recorded successfully!");
  };

  const handleReminder = (name) => {
    alert(`Reminder sent to ${name} successfully.`);
  };

  return (
    <div className="attendance-page">
      {/* 1. Header */}
      <header className="admin-welcome" style={{ padding: '24px', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', borderRadius: '8px', background: '#fff', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="admin-eyebrow" style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Finance</p>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Fees Management</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Track student payments, outstanding balances, and generate receipts.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <select className="date-picker" value={session} onChange={(e) => setSession(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
            <option value="2025-26">2025-26</option>
            <option value="2026-27">2026-27</option>
            <option value="2027-28">2027-28</option>
          </select>
          <div className="attendance-header-actions">
            <button className="btn-minimal" onClick={() => alert("Downloading PDF...")}>Export</button>
            <button className="btn-primary" onClick={() => openCollectModal()}>Collect Fee</button>
          </div>
        </div>
      </header>

      {/* 2. Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-title">Collected Today</div>
          <div className="summary-card-value">{formatCurrency(stats.collectedToday)}</div>
          <div className="summary-card-subtext">Cash & Online</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-title">Collected This Month</div>
          <div className="summary-card-value">{formatCurrency(stats.collectedMonth)} <span style={{fontSize:'16px', color:'#166534'}}>({stats.monthPct}%)</span></div>
          <div className="summary-card-subtext">Against target</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-title">Total Pending</div>
          <div className="summary-card-value" style={{color: '#b91c1c'}}>{formatCurrency(stats.totalPending)}</div>
          <div className="summary-card-subtext">Across all classes</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-title">Overdue Students</div>
          <div className="summary-card-value" style={{color: '#b91c1c'}}>{stats.overdueCount}</div>
          <div className="summary-card-subtext">Crossed due date</div>
        </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="filters-bar">
        <select className="filter-select" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="All">All Classes</option>
          {Array.from({length: 12}).map((_, i) => <option key={i+1} value={i+1}>Class {i+1}</option>)}
        </select>
        <select className="filter-select" value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
          <option value="All">All Sections</option>
          {["A", "B", "C", "D"].map(s => <option key={s} value={s}>Section {s}</option>)}
        </select>
        <select className="filter-select" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="All">All Months</option>
          {["April", "May", "June", "July"].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Due">Due</option>
          <option value="Overdue">Overdue</option>
          <option value="Partial">Partial</option>
        </select>
        <input type="text" className="filter-search" placeholder="Search student, roll no, receipt..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* 4. Student Fee Table */}
      <div className="minimal-table-container">
        <table className="minimal-table">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Class-Section</th>
              <th style={{textAlign: 'right'}}>Total Fee</th>
              <th style={{textAlign: 'right'}}>Paid</th>
              <th style={{textAlign: 'right'}}>Pending</th>
              <th style={{textAlign: 'center'}}>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFees.length > 0 ? filteredFees.slice(0, 20).map(f => (
              <tr key={f.id}>
                <td>{f.rollNo}</td>
                <td><span className="link-primary">{f.name}</span></td>
                <td>{f.classSection}</td>
                <td style={{textAlign: 'right'}}>{formatCurrency(f.totalFee)}</td>
                <td style={{textAlign: 'right', color: '#166534'}}>{formatCurrency(f.paid)}</td>
                <td style={{textAlign: 'right', color: f.pending > 0 ? '#b91c1c' : '#1e293b'}}>{formatCurrency(f.pending)}</td>
                <td style={{textAlign: 'center'}}>
                  <span className={`status-badge status-${f.status.toLowerCase()}`} style={
                    f.status === "Paid" ? {backgroundColor: '#dcfce7', color: '#166534'} :
                    f.status === "Overdue" ? {backgroundColor: '#fee2e2', color: '#b91c1c'} :
                    f.status === "Due" ? {backgroundColor: '#fef3c7', color: '#b45309'} :
                    {backgroundColor: '#dbeafe', color: '#1e40af'}
                  }>
                    {f.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {f.status !== "Paid" && (
                      <span className="link-primary" onClick={() => openCollectModal(f)}>Collect</span>
                    )}
                    <span className="link-primary">View</span>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={8} style={{textAlign: 'center', padding: '24px'}}>No fee records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 5 & 6. Bottom Layout (2 Columns) */}
      <div className="bottom-sections">
        {/* Overdue List */}
        <div className="section-card">
          <h3>Overdue Alert (&gt; 10 days)</h3>
          <table className="minimal-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th style={{textAlign: 'right'}}>Pending</th>
                <th>Overdue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {overdueStudents.map(f => (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td>{f.classSection}</td>
                  <td style={{textAlign: 'right', color: '#b91c1c', fontWeight: '500'}}>{formatCurrency(f.pending)}</td>
                  <td style={{color: '#b91c1c'}}>{f.daysOverdue} days</td>
                  <td><span className="link-primary" onClick={() => handleReminder(f.name)}>Send Reminder</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Collection Report */}
        <div className="section-card">
          <h3>Monthly Collection Report</h3>
          <table className="minimal-table">
            <thead>
              <tr>
                <th>Month</th>
                <th style={{textAlign: 'right'}}>Target</th>
                <th style={{textAlign: 'right'}}>Collected</th>
                <th style={{textAlign: 'right'}}>Pending</th>
                <th style={{textAlign: 'center'}}>%</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY_COLLECTION.map((r, idx) => (
                <tr key={idx}>
                  <td><span className="link-primary">{r.month}</span></td>
                  <td style={{textAlign: 'right'}}>{formatCurrency(r.target)}</td>
                  <td style={{textAlign: 'right', color: '#166534'}}>{formatCurrency(r.collected)}</td>
                  <td style={{textAlign: 'right'}}>{formatCurrency(r.pending)}</td>
                  <td style={{textAlign: 'center', fontWeight: '500'}}>{r.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Recent Transactions (Full width) */}
      <div className="section-card" style={{ marginBottom: '24px' }}>
        <h3>Recent Transactions</h3>
        <div className="minimal-table-container" style={{ marginBottom: 0, border: 'none' }}>
          <table className="minimal-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Receipt No.</th>
                <th>Student</th>
                <th style={{textAlign: 'right'}}>Amount</th>
                <th>Mode</th>
                <th>Collected By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TRANSACTIONS.map((tx, idx) => (
                <tr key={idx}>
                  <td>{tx.date}</td>
                  <td>{tx.receiptNo}</td>
                  <td>{tx.student}</td>
                  <td style={{textAlign: 'right', fontWeight: '500'}}>{formatCurrency(tx.amount)}</td>
                  <td>{tx.mode}</td>
                  <td>{tx.collectedBy}</td>
                  <td><span className="link-primary">Download Receipt</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. Footer Note */}
      <div className="footer-note">
        Fees are due by the 10th of every month. Late fees apply after the due date. All changes are logged for audit.
      </div>

      {/* 9. Collect Fee Modal */}
      {collectModal.isOpen && (
        <div className="minimal-modal-overlay">
          <div className="minimal-modal" style={{ maxWidth: '500px' }}>
            <div className="minimal-modal-header">
              <h3>Collect Fee {collectModal.student ? `- ${collectModal.student.name}` : ""}</h3>
            </div>
            <div className="minimal-modal-body">
              {!collectModal.student && (
                <div className="form-group">
                  <label>Search Student</label>
                  <input type="text" className="form-control" placeholder="Enter name or roll number..." />
                </div>
              )}
              
              <div className="form-group">
                <label>Amount (₹)</label>
                <input type="number" className="form-control" value={paymentForm.amount} onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})} placeholder="0.00" />
              </div>
              
              <div className="form-group">
                <label>Payment Mode</label>
                <select className="form-control" value={paymentForm.mode} onChange={e => setPaymentForm({...paymentForm, mode: e.target.value})}>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>

              <div className="form-group">
                <label>Remarks / Reference Number</label>
                <input type="text" className="form-control" placeholder="Optional" />
              </div>
            </div>
            <div className="minimal-modal-footer">
              <button className="btn-minimal" onClick={() => setCollectModal({ isOpen: false, student: null })}>Cancel</button>
              <button className="btn-primary" onClick={handleCollectSave}>Save Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
