import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatDate } from "../../utils/FileFormatter";
import "./History.css";

function SaveMe() {
  const [reportHistory] = useState(useLoaderData());

  return (
    <div className="history-dashboard">
      <h1>Save a life now!</h1>
      <div className="cards">
        {reportHistory.length > 0 ? (
          reportHistory.map((report) => {
            return (
              <div className="card-item" key={report.report_id}>
                <img
                  src={report.image_of_the_stray}
                  alt="stray photo"
                  className="card-img"
                ></img>
                <div>
                  {report.status !== "Saved" ? (
                    <p>
                      Date reported:{" "}
                      <span>{formatDate(report.report_date)}</span>
                    </p>
                  ) : (
                    <p>
                      Date saved: <span>{formatDate(report.updated_at)}</span>
                    </p>
                  )}

                  <p>
                    Status:{" "}
                    <span className={report.status === "Saved" && "save"}>
                      {report.status}
                    </span>
                  </p>
                </div>
                <div className="btn">
                  <div>
                    <Link to={`editReport/${report.report_id}`}>
                      <button className="edit-btn">View/Edit</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-data">No data to display.</p>
        )}
      </div>
    </div>
  );
}

export default SaveMe;
