import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import app from "../api/axios-config";
import "./EditReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "../../utils/FileFormatter";

function EditPost() {
  const params = useParams();
  const data = useLoaderData();

  const [postData, setPostData] = useState(data[0]);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setPostData({ ...postData, image_url: e.target.files[0] });
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("strayImage", postData.image_url);
      formData.append("pet_name", postData.pet_name);
      formData.append("age", postData.age);
      formData.append("gender", postData.gender);
      formData.append("description", postData.description);
      formData.append("type", postData.type);
      formData.append("status", postData.status);

      const res = await app.put(`/animalInfo/${params.id}`, formData);

      console.log(res.data);
      if (res.status === 200)
        toast.success("Post updated successfully", toast.POSITION.TOP_RIGHT);

      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response", toast.POSITION.TOP_RIGHT);
        console.log(err);
      } else {
        toast.warning("Failed to update post", toast.POSITION.TOP_RIGHT);
      }
    }
  };

  return (
    <div className="report">
      <ToastContainer />
      <h1 className="report-title">Edit Post</h1>

      <div className="report-input">
        {postData && (
          <div className="report-field">
            <Form
              method="put"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              key={postData.animal_id}
            >
              <label htmlFor="petName">*Pet Name:</label>
              <input
                type="text"
                name="pet_name"
                id="petName"
                value={postData.pet_name}
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <label htmlFor="age">*Age:</label>
              <input
                type="text"
                name="age"
                id="age"
                value={postData.age}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="gender">*Gender:</label>
              <select
                name="gender"
                id="gender"
                value={postData.gender}
                autoComplete="off"
                onChange={handleChange}
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
                value={postData.description}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="type">*Type:</label>
              <input
                type="text"
                name="type"
                id="type"
                value={postData.type}
                autoComplete="off"
                onChange={handleChange}
                required
              />

              <label htmlFor="strayImage">*Image:</label>
              <input
                type="file"
                accept="image/*"
                name="strayImage"
                id="strayImage"
                autoComplete="off"
                onChange={handleFileChange}
              />

                  
                  <label htmlFor="postDate">Date Posted:</label>
                  <input
                    value={formatDate(postData.updated_at)}
                    type="datetime"
                    id="postDate"
                    name="updated_at"
                    disabled
                  ></input>
                <label htmlFor="status">
                  *Status:
                  <select
                    id="status"
                    name="status"
                    value={postData.status}
                    onChange={handleChange}
                  >
                    <option value="for adoption">
                      For Adoption
                    </option>
                    <option value="adopted">Adopted</option>
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
            src={!image ? postData.image_url : image}
            alt="pet animal"
          />
        </div>
      </div>
    </div>
  );
}

export default EditPost;
