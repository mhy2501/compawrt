import { connectDatabase } from "../pool.js";
import { cloudinary } from "../utils/cloudinary.js";

const pool = connectDatabase();

const getAnimalInfo = async (req, res) => {
  try {
    const animalInfo = await pool.query(
      `SELECT * FROM animal_infos WHERE user_id = $1 ORDER BY updated_at DESC`,
      [req.user.user_id]
    );
    res.json(animalInfo.rows);
  } catch (error) {
    console.log(error);
  }
};

const getAnimalInfos = async (req, res) => {
  try {
    const animalInfo = await pool.query(
      `SELECT * FROM animal_infos ORDER BY updated_at DESC`,
    );
    res.json(animalInfo.rows);
  } catch (error) {
    console.log(error);
  }
};

const postAnimalInfo = async (req, res) => {
  try {
    //take the animal_info from the req.body
    const { pet_name, age, gender, description, type } = req.body;

    //Check if the animal_info is already existing
    const animal = await pool.query(
      `SELECT * FROM animal_infos WHERE
        type = $1`,
      [type]
    );

    if (animal.rows.length > 0) {
      return res.status(401).send("Animal_info already exists");
    }

    const image = await cloudinary.uploader.upload(req.file.path)

    const newAnimal = await pool.query(
      `
        INSERT INTO animal_infos (
            pet_name,
            age,
            gender,
            description,
            type,
            image_url,
            cloudinary_id,
            user_id
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [pet_name, age, gender, description, type, image.secure_url, image.public_id, req.user.user_id]
    );
    res.json(newAnimal.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const updateAnimalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_name, age, gender, description, type, status} = req.body;

    const updateAnimalInfo = await pool.query(
      `SELECT image_url, cloudinary_id FROM animal_infos WHERE animal_id = $1`, [id]
    )

    let image;
    if (req.file) {
      await cloudinary.uploader.destroy(updateAnimalInfo.rows[0].cloudinary_id);
      image = await cloudinary.uploader.upload(req.file.path);
    } else {
      image = {
        secure_url: updateAnimalInfo.rows[0].image_url,
        public_id: updateAnimalInfo.rows[0].cloudinary_id
      };
    }

    const updatedAnimalInfo = await pool.query(
      `
        UPDATE animal_infos SET 
        (
            pet_name,
            age,
            gender,
            description,
            type,
            image_url,
            cloudinary_id,
            status,
            updated_at
        ) = ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
        WHERE animal_id = $9 RETURNING*`,
      [pet_name, age, gender, description, type, image.secure_url, image.public_id, status, id]
    );
    res.json(updatedAnimalInfo.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteAnimal = await pool.query(
      `SELECT * FROM animal_infos WHERE animal_id = $1`,
      [id]
    );
    await cloudinary.uploader.destroy(deleteAnimal.rows[0].cloudinary_id);

    const deletedAnimal = await pool.query(
      `DELETE FROM animal_infos WHERE animal_id = $1`,
      [id]
    );
    res.json(`Animal ${id} deleted`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const editAnimal = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id)
    const editAnimal = await pool.query(
      `SELECT * FROM animal_infos WHERE animal_id = $1`, [id]
    );
    res.json(editAnimal.rows);
    console.log(editAnimal.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export { getAnimalInfo, postAnimalInfo, deleteAnimal, updateAnimalInfo, getAnimalInfos, editAnimal };
