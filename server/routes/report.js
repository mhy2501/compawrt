import {connectDatabase} from "../pool.js"

const pool = connectDatabase()

const getReport = async (req, res) => {
    try {
	    const report = await pool.query(`SELECT * FROM report WHERE user_id = $1`, [req.user.user_id])
	    res.json(report.rows)
    } catch (error) {
	    console.log(error)
    }
}

const postReport = async (req, res) => {
    try {

        //take the report details from the req.body
        const {
            last_seen_at_street_name,
            last_seen_at_barangay_name,
            last_seen_at_municipality_name,
            last_seen_at_province_name,
            landmark,
            type_of_animal,
            image_of_the_stray,
            status
        } = req.body

        //Check if the report is already existing
        const report = await pool.query(`SELECT * FROM report WHERE
        image_of_the_stray = $1`, [image_of_the_stray])

        if (report.rows.length > 0) {
            return res.status(401).send("Report already exists")
        }

        const newReport = await pool.query(`
        INSERT INTO report (
            last_seen_at_street_name,
            last_seen_at_barangay_name,
            last_seen_at_municipality_name,
            last_seen_at_province_name,
            landmark,
            type_of_animal,
            image_of_the_stray,
            status,
            user_id
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING*`, 
        [
            last_seen_at_street_name,
            last_seen_at_barangay_name,
            last_seen_at_municipality_name,
            last_seen_at_province_name,
            landmark,
            type_of_animal,
            image_of_the_stray,
            status,
            req.user.user_id
        ]);
        res.json(newReport.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

const updateReport = async (req, res) => {
    try {
        const {id} = req.params
        const {
                last_seen_at_street_name,
                last_seen_at_barangay_name,
                last_seen_at_municipality_name,
                last_seen_at_province_name,
                landmark,
                type_of_animal,
                image_of_the_stray,
                status
            } = req.body

            const updatedReport = await pool.query(`
            UPDATE report SET
            (
                last_seen_at_street_name,
                last_seen_at_barangay_name,
                last_seen_at_municipality_name,
                last_seen_at_province_name,
                landmark,
                type_of_animal,
                image_of_the_stray,
                status,
                updated_at
            ) = ($1, $2, $3, $4, $5, $6, $7, $8,CURRENT_TIMESTAMP)
            WHERE report_id = $9 and user_id = $10 RETURNING*`,
            [
                last_seen_at_street_name,
                last_seen_at_barangay_name,
                last_seen_at_municipality_name,
                last_seen_at_province_name,
                landmark,
                type_of_animal,
                image_of_the_stray,
                status,
                id,
                req.user.user_id
            ])
            res.json(updatedReport.rows)
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message)
        }
}

const deleteReport = async (req, res) => {
    try {
        const {id} = req.params

        const deletedReport = await pool.query(
            `DELETE FROM report WHERE report_id = $1 and user_id = $2`,[Number(id), req.user.user_id])
        res.json(`Report id# ${id} deleted`)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

export {getReport, postReport, deleteReport, updateReport}