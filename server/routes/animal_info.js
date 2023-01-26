import {connectDatabase} from "../pool.js"

const pool = connectDatabase()

const getAnimalInfo = async (req, res) => {
    try {
	    const animalInfo = await  pool.query(`SELECT * FROM animal_info WHERE user_id = $1`, [req.user.user_id])
	    res.json(animalInfo.rows)
    } catch (error) {
	    console.log(error)
    }
}

const postAnimalInfo = async (req, res) => {
    try {

        //take the animal_info from the req.body
        const {
            pet_name,
            age,
            image_url,
            for_adoption
        } = req.body

        //Check if the animal_info is already existing
        const animal = await pool.query(`SELECT * FROM animal_info WHERE
        image_url = $1`, [image_url])

        if (animal.rows.length > 0) {
            return res.status(401).send("Animal_info already exists")
        }

        const newAnimal = await pool.query(`
        INSERT INTO animal_info (
            pet_name,
            age,
            image_url,
            for_adoption,
            user_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [
            pet_name,
            age,
            image_url,
            for_adoption,
            req.user.user_id
        ])
        res.json(newAnimal.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

const updateAnimalInfo = async (req, res) => {
    try {
        const {id} = req.params
        const {
            pet_name,
            age,
            image_url,
            for_adoption
        } = req.body

        const updatedAnimalInfo = await pool.query(`
        UPDATE animal_info SET 
        (
            pet_name,
            age,
            image_url,
            for_adoption,
            updated_at
        ) = ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        WHERE animal_id = $5 and user_id = $6 RETURNING*`,
        [
            pet_name,
            age,
            image_url,
            for_adoption,
            id,
            req.user.user_id
        ])
        res.json(updatedAnimalInfo.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

const deleteAnimal = async (req, res) => {
    try {
        const {id} = req.params

        const deletedAnimal = await pool.query(
            `DELETE FROM animal_info WHERE animal_id = $1 and user_id = $2`,[Number(id), req.user.user_id])
        // res.json(`Animal info# ${id} deleted`)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

export {getAnimalInfo, postAnimalInfo, deleteAnimal, updateAnimalInfo}