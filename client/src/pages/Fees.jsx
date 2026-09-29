import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Fees() {
  const navigate = useNavigate();
  const role = getRole();
  const [fees, setFees] = useState([]);
  const [searchId, setSearchId] = useState("");

  const feeColumns = [
    { key: "fees_id", label: "Fee ID" },
    { key: "class_id", label: "Class ID" },
    { key: "student_id", label: "Student ID" },
    { key: "total_fees", label: "Total Fees" },
    { key: "date_of_payment", label: "Payment Date" },
    { key: "balance_due", label: "Balance Due" },
  ];

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await api.get("/fees");
        setFees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFees();
  }, []);

  const handleDelete = async (fee) => {
    try {
      await api.delete(`/fees/${fee.fees_id}`);
      setFees((current) =>
        current.filter((item) => item.fees_id !== fee.fees_id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtons = [
    {
      label: <MdEdit size={18} />,
      style: "primary",
      onClick: (fee) => navigate("/editfees", { state: fee }),
    },
    {
      label: <MdDeleteForever size={18} />,
      style: "danger",
      onClick: handleDelete,
    },
  ];

  const filteredFees = fees.filter(
    (fee) =>
      fee.fees_id.toString().includes(searchId) ||
      fee.student_id.toString().includes(searchId),
  );

  return (
    <div>
      <div className="student-bar">
        <h2>Fees</h2>
        {role === "admin" && (
          <button
            onClick={() => navigate("/addfees")}
            className="add-btn"
            title="Add fee"
            aria-label="Add fee"
          >
            <IoIosAddCircleOutline size={18} />
          </button>
        )}
      </div>
      <div className="search-std">
        <input
          type="text"
          placeholder="Search ID"
          value={searchId}
          className="searchid-inpt"
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <Table
        title="Fee Records"
        columns={feeColumns}
        data={filteredFees}
        actionButtons={actionButtons}
        viewLink="/fees"
      />
    </div>
  );
}
