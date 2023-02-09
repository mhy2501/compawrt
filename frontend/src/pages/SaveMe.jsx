import { useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import app from "../api/axios-config";
import Dialog from "../components/Dialog";
import "./History.css";

function SaveMe() {
    const data = useLoaderData()
   
  const [reportHistory, setReportHistory] = useState(data);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const reportRef = useRef();

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
      <div className="cards">
        {reportHistory?.map((report) => {
          return (
            <div className="card-item" key={report.report_id}>
              <img
                src={report.image_of_the_stray}
                alt="stray photo"
                className="card-img"
              ></img>
              <div>
              {report.status === 'saved' ?
              (
                <p>
                  Date reported: <span>{report.report_date}</span>
                </p>

              ) : 
              (
                <p>
                Date saved: <span>{report.updated_at}</span>
              </p>
              )
              }

                <p>
                  Status: <span>{report.status}</span>
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
        })}
        {dialog.isLoading && (
          <Dialog onDialog={sureDelete} message={dialog.message} />
        )}
      </div>
    </div>
  );
}

export default SaveMe;
