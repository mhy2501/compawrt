import { useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatDate } from "../../utils/FileFormatter";
import app from "../api/axios-config";
import Dialog from "../components/Dialog";
import "./History.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function History() {
 
  const [reportHistory, setReportHistory] = useState(useLoaderData());
  const [searchResults, setSearchResults] = useState('')
  const reportRef = useRef();

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete this report?", true);
    reportRef.current = id;
  };

  const sureDelete = async (choose) => {
    if (choose) {
      const res = await app.delete(`report/${reportRef.current}`);
      const updatedHistory = reportHistory.filter(
        (report) => report.report_id !== reportRef.current
      );
      setReportHistory(updatedHistory);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  return (
    <div className="history-dashboard">
      <h1>Report History</h1>
      <div className="search-bar">
        <form className="search-form">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input 
        className="search-input"
        type='text'
        placeholder='Search by status, type or location'
        onChange={(e) => setSearchResults(e.target.value)} />
      </form>
      </div>
      <div className="cards">
        {reportHistory.length > 0 ? (
          reportHistory.filter((report) => {
            return searchResults.toLowerCase() === '' ? report :
            report.status.toLowerCase().includes(searchResults) ||
            report.animal_type.toLowerCase().includes(searchResults) ||
            report.last_seen_at_street_name.toLowerCase().includes(searchResults) ||
            report.last_seen_at_barangay_name.toLowerCase().includes(searchResults) ||
            report.last_seen_at_municipality_name.toLowerCase().includes(searchResults) ||
            report.last_seen_at_province_name.toLowerCase().includes(searchResults)
          })
          .map((report) => {
            return (
              <div className="card-item" key={report.report_id}>
                <img
                  src={report.image_of_the_stray}
                  alt="stray photo"
                  className="card-img"
                ></img>
                <div>
                  {report.status !== 'Saved' ?
                    (
                      <>
                    <p>
                    Date reported: <span>{formatDate(report.report_date)}</span>
                  </p>
                  </>) :
                  ( 
                    <>
                    <p> 
                    Date saved: <span>{formatDate(report.updated_at)}</span>
                    </p>
                    </>
                    )}
                  
                  <p>
                    Status:{" "}
                    <span className={report.status === "Saved" ? "save" : ''}>
                      {report.status}!
                    </span>
                  </p>
                </div>
                <div className="btn">
                  <div>
                    <Link to={`editReport/${report.report_id}`}>
                      <button className="edit-btn">View/Edit</button>
                    </Link>
                  </div>
                  <div>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        handleDelete(report.report_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-data">No data to display.</p>
        )}
        {dialog.isLoading && (
          <Dialog onDialog={sureDelete} message={dialog.message} />
        )}
      </div>
    </div>
  );
}

export default History;
