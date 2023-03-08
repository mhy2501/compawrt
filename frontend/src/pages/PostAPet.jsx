import { useState } from "react";
import { Form } from "react-router-dom";
import app from "../api/axios-config";
import "./Report.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostAPet() {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("")
  const [animalImage, setAnimalImage] = useState("");
 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("strayImage", animalImage);
      formData.append("pet_name", petName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("description", description);
      formData.append("type", type);
     
      const res = await app.post("/animalInfo", formData);
      console.log(res.data);
      setPetName("");
      setAge("");
      setGender("");
      setDescription("");
      setType("");
      setAnimalImage("");

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
      <h1 className="form-title">Post your babies ready for adoption</h1>

      
      <div className="formreport-input">
        <Form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="petName">*Name:</label>
          <input
            type="text"
            name="pet_name"
            id="petName"
            value={petName}
            autoComplete="off"
            onChange={(e) => {
              setPetName(e.target.value);
            }}
            required
          />
          <label htmlFor="age">*Age:</label>
          <input
            type="text"
            name="age"
            id="age"
            value={age}
            autoComplete="off"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            required
          />

          <label htmlFor="gender">*Gender:</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            autoComplete="off"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            required
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            </select>

          <label htmlFor="description">*Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            autoComplete="off"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />

          <label htmlFor="type">*Type:</label>
          <input
            type="text"
            name="type"
            id="type"
            value={type}
            autoComplete="off"
            onChange={(e) => {
              setType(e.target.value);
            }}
            required
          />
          
          <label htmlFor="imageUrl">*Pet Image:</label>
          <input
            type="file"
            accept="image/*"
            name="strayImage"
            id="imageUrl"
            autoComplete="off"
            onChange={(e) => {
              setAnimalImage(e.target.files[0]);
            }}
            required
          />

          <button className="submit-btn">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
    </div>
  );
}

export default PostAPet;
