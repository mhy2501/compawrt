import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import app from "../api/axios-config";
import "./EditReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditReport() {
  const params = useParams();
  const data = useLoaderData();
  const navigate = useNavigate();

  const [reportData, setReportData] = useState(data[0]);
  const [image, setImage] =useState(null)
  const [loading, setLoading] = useState(false);

  console.log(reportData);

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setReportData({ ...reportData, image_of_the_stray: e.target.files[0] });
    setImage(URL.createObjectURL(e.target.files[0]))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("strayImage", reportData.image_of_the_stray);
      formData.append("streetName", reportData.last_seen_at_street_name);
      formData.append("barangayName", reportData.last_seen_at_barangay_name);
      formData.append(
        "municipalityName",
        reportData.last_seen_at_municipality_name
      );
      formData.append("provinceName", reportData.last_seen_at_province_name);
      formData.append("animalType", reportData.type_of_animal);
      formData.append("landmark", reportData.landmark);
      formData.append("status", reportData.status);

      const res = await app.put(`/report/${params.id}`, formData);

      console.log(res.data);
      if (res.status === 200)
        toast.success("Report updated successfully", toast.POSITION.TOP_RIGHT);

      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response", toast.POSITION.TOP_RIGHT);
        console.log(err);
      } else {
        toast.warning("Failed to update report", toast.POSITION.TOP_RIGHT);
      }
    }
  };

  return (
    <div className="report">
      <ToastContainer />
      <h1 className="report-title">Edit Report</h1>

      <div className="report-input">
        {reportData && (
          <div className="report-field">
            <Form
              method="put"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              key={reportData.report_id}
            >
              <label htmlFor="streetName">*Street:</label>
              <input
                type="text"
                name="last_seen_at_street_name"
                id="streetName"
                value={reportData.last_seen_at_street_name}
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <label htmlFor="barangayName">*Barangay:</label>
              <input
                type="text"
                name="last_seen_at_barangay_name"
                id="barangayName"
                value={reportData.last_seen_at_barangay_name}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="municipalityName">*Municipality:</label>
              <input
                type="text"
                name="last_seen_at_municipality_name"
                id="municipalityName"
                value={reportData.last_seen_at_municipality_name}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="provinceName">*Province:</label>
              <input
                type="text"
                name="last_seen_at_province_name"
                id="provinceName"
                value={reportData.last_seen_at_province_name}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="landmark">*Landmark:</label>
              <input
                type="text"
                name="landmark"
                id="landmark"
                value={reportData.landmark}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="animalType">*Type of animal:</label>
              <input
                type="text"
                name="type_of_animal"
                id="animalType"
                value={reportData.type_of_animal}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="strayImage">*Stray Image:</label>
              <input
                type="file"
                accept="image/*"
                name="strayImage"
                id="strayImage"
                autoComplete="off"
                onChange={handleFileChange}
              />

              <label htmlFor="status">
                *Status:
                <select
                  id="status"
                  name="status"
                  value={reportData.status}
                  onChange={handleChange}
                >
                  <option value="waiting to be saved">
                    Waiting to be saved
                  </option>
                  <option value="Saved">Saved</option>
                </select>
              </label>

              <button className="submit-btn">
                {loading ? "Updating..." : "Update"}
              </button>
            </Form>
          </div>
        )}
        <div>
          <img
            className="reportImg"
            src={!image ? reportData.image_of_the_stray : image}
            alt="stray"
          />
        </div>
      </div>
    </div>
  );
}

export default EditReport;
