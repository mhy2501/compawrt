import { useState } from "react";
import { Form } from "react-router-dom";
import app from "../api/axios-config";
import "./Report.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Report() {
  const [streetName, setStreetName] = useState("");
  const [barangayName, setBarangayName] = useState("");
  const [municipalityName, setMunicipalityName] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [animalImage, setAnimalImage] = useState("");
  const [status, setStatus] = useState("waiting to be saved");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("strayImage", animalImage);
      formData.append("streetName", streetName);
      formData.append("barangayName", barangayName);
      formData.append("municipalityName", municipalityName);
      formData.append("provinceName", provinceName);
      formData.append("animalType", animalType);
      formData.append("landmark", landmark);
      formData.append("status", status);

      const res = await app.post("/report", formData);
      console.log(res.data);
      setStreetName("");
      setBarangayName("");
      setMunicipalityName("");
      setProvinceName("");
      setLandmark("");
      setAnimalType("");
      setAnimalImage("");
      setStatus("");
      if (res.status === 200) setLoading(false);
      toast.success("Report submitted successfully", toast.POSITION.TOP_RIGHT);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response", toast.POSITION.TOP_RIGHT);
      } else if (err.response?.status === 401) {
        toast.error("Report already exist", toast.POSITION.TOP_RIGHT);
      } else {
        toast.warning("Report Submission Failed", toast.POSITION.TOP_RIGHT);
      }
    }
  };

  return (
    <div className="form-report">
      <ToastContainer />
      <h1 className="form-title">Create Report</h1>

      <p>Where did you last saw the stray animal?</p>
      <div className="formreport-input">
        <Form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="streetName">*Street:</label>
          <input
            type="text"
            name="streetName"
            id="streetName"
            value={streetName}
            autoComplete="off"
            onChange={(e) => {
              setStreetName(e.target.value);
            }}
            required
          />
          <label htmlFor="barangayName">*Barangay:</label>
          <input
            type="text"
            name="barangayName"
            id="barangayName"
            value={barangayName}
            autoComplete="off"
            onChange={(e) => {
              setBarangayName(e.target.value);
            }}
            required
          />

          <label htmlFor="municipalityName">*Municipality:</label>
          <input
            type="text"
            name="municipalityName"
            id="municipalityName"
            value={municipalityName}
            autoComplete="off"
            onChange={(e) => {
              setMunicipalityName(e.target.value);
            }}
            required
          />

          <label htmlFor="provinceName">*Province:</label>
          <input
            type="text"
            name="provinceName"
            id="provinceName"
            value={provinceName}
            autoComplete="off"
            onChange={(e) => {
              setProvinceName(e.target.value);
            }}
            required
          />

          <label htmlFor="landmark">*Landmark:</label>
          <input
            type="text"
            name="landmark"
            id="landmark"
            value={landmark}
            autoComplete="off"
            onChange={(e) => {
              setLandmark(e.target.value);
            }}
            required
          />

          <label htmlFor="animalType">*Type of animal:</label>
          <input
            type="text"
            name="animalType"
            id="animalType"
            value={animalType}
            autoComplete="off"
            onChange={(e) => {
              setAnimalType(e.target.value);
            }}
            required
          />

          <label htmlFor="imageurl">*Stray Image:</label>
          <input
            type="file"
            accept="image/*"
            name="strayImage"
            id="imageurl"
            autoComplete="off"
            onChange={(e) => {
              setAnimalImage(e.target.files[0]);
            }}
            required
          />

          <label htmlFor="status">
            *Status:
            <select
              id="status"
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="waiting to be saved">Waiting to be saved</option>
              <option value="Saved">Saved</option>
            </select>
          </label>

          <button className="submit-btn">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Report;
