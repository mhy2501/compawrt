import { connectDatabase } from "../pool.js";
import { cloudinary } from "../utils/cloudinary.js";
import { upload } from "../utils/multer.js";
import path from "path";

const pool = connectDatabase();

const getReport = async (req, res) => {
  try {
    const report = await pool.query(
      `SELECT * FROM reports WHERE user_id = $1 ORDER BY updated_at DESC`,
      [req.user.user_id]
    );
    res.json(report.rows);
  } catch (error) {
    console.log(error);
  }
};

const postReport = async (req, res) => {
  try {
    //take the report details from the req.body
    // const image = await cloudinary.uploader.upload(req.file.path)
    const {
      streetName,
      barangayName,
      municipalityName,
      provinceName,
      landmark,
      animalType,
    } = req.body;

    //Check if the report is already existing
    const report = await pool.query(
      `SELECT * FROM reports WHERE
        landmark = $1`,
      [landmark]
    );

    if (report.rows.length > 0) {
      return res.status(401).send("Report already exists");
    }

    const image = await cloudinary.uploader.upload(req.file.path);

    const newReport = await pool.query(
      `
        INSERT INTO reports (
            last_seen_at_street_name,
            last_seen_at_barangay_name,
            last_seen_at_municipality_name,
            last_seen_at_province_name,
            landmark,
            type_of_animal,
            image_of_the_stray,
            cloudinary_id,
            user_id
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING*`,
      [
        streetName,
        barangayName,
        municipalityName,
        provinceName,
        landmark,
        animalType,
        image.secure_url,
        image.public_id,
        req.user.user_id,
      ]
    );

    res.json(newReport.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const {
      streetName,
      barangayName,
      municipalityName,
      provinceName,
      landmark,
      animalType,

      status,
    } = req.body;
    const updateReport = await pool.query(
      `
            SELECT image_of_the_stray, cloudinary_id
             FROM reports WHERE report_id = $1`,
      [id]
    );

    let image;
    if (req.file) {
      await cloudinary.uploader.destroy(updateReport.rows[0].cloudinary_id);
      image = await cloudinary.uploader.upload(req.file.path);
    } else {
      image = {
        secure_url: updateReport.rows[0].image_of_the_stray,
        public_id: updateReport.rows[0].cloudinary_id,
      };
    }

    const updatedReport = await pool.query(
      `
            UPDATE reports SET
            (
                last_seen_at_street_name,
                last_seen_at_barangay_name,
                last_seen_at_municipality_name,
                last_seen_at_province_name,
                landmark,
                type_of_animal,
                image_of_the_stray,
                cloudinary_id,
                status,
                updated_at
            ) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
            WHERE report_id = $10 and user_id = $11 RETURNING*`,
      [
        streetName,
        barangayName,
        municipalityName,
        provinceName,
        landmark,
        animalType,
        image.secure_url,
        image.public_id,
        status,
        id,
        req.user.user_id,
      ]
    );
    res.json("Report updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteReport = await pool.query(
      `SELECT * FROM reports WHERE report_id = $1`,
      [id]
    );
    await cloudinary.uploader.destroy(deleteReport.rows[0].cloudinary_id);

    const deletedReport = await pool.query(
      `DELETE FROM reports WHERE report_id = $1 and user_id = $2`,
      [id, req.user.user_id]
    );
    res.json(`Report ${id} deleted`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const editReport = async (req, res) => {
  try {
    const { id } = req.params;

    const editReport = await pool.query(
      `SELECT * FROM reports WHERE report_id = $1 and user_id = $2`,
      [id, req.user.user_id]
    );
    res.json(editReport.rows);
    console.log(editReport.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export { getReport, postReport, deleteReport, updateReport, editReport };
