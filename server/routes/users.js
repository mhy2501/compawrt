import bcrypt from "bcryptjs";
import { generateJwt } from "../jwt/jwtGenerator.js";
import { connectDatabase } from "../pool.js";

const pool = connectDatabase();

const getUser = async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user.user_id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    //take the username and password from the req.body
    const { username, first_name, last_name, email, password } = req.body;

    //Check if the user is already existing
    const user = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    if (user.rows.length > 0) {
      return res.status(400).send("Username already taken");
    }

    //Check if the email is already existing
    const userEmail = await pool.query(
      `SELECT * FROM users WHERE
          email = $1`,
      [email]
    );

    if (userEmail.rows.length > 0) {
      return res.status(401).send("Email already use");
    }

    //Setup Bcrypt for password hashing
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `
        INSERT INTO users (
            username, 
            first_name, 
            last_name, 
            email, 
            password
           )
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, first_name, last_name, email, bcryptPassword]
    );

    //generate and return the JWT token
    const token = generateJwt(newUser.rows[0]);

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    // const {id} = req.params
    const { username, first_name, last_name, email } = req.body;

    const updatedUser = await pool.query(
      `
        UPDATE users SET
            (
            username, 
            first_name, 
            last_name,
            email, 
            updated_at
            )
        = ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        WHERE user_id = $5 RETURNING *`,
      [username, first_name, last_name, email, req.user.user_id]
    );
    res.json(updatedUser.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    //take the username and password from the req.body
    const { username, password } = req.body;

    //Check if the user is not existing
    const user = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(400).send("User does not exists");
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password or Username is incorrect");
    }

    //generate and return the JWT
    const token = generateJwt(user.rows[0]);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
};

// provide the auth middleware
const verifyUser = async (req, res) => {
  try {
    //return the user object
    res.json(true);
  } catch (error) {
    console.log(err.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await pool.query(
      `DELETE FROM users WHERE user_id = $1`,
      [id]
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export { getUser, registerUser, loginUser, verifyUser, deleteUser, updateUser };
