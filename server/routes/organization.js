import {connectDatabase} from "../pool.js"

const pool = connectDatabase()

const getOrganization = async (req, res) => {
    try {
	    const org = await pool.query('SELECT * FROM organization');
	    res.json(org.rows)
    } catch (error) {
	    console.log(error)
    }
}

const postOrganization = async (req, res) => {
    try {

        //take the organization details from the req.body
        const {
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address
        } = req.body

        // Check if the organization is already existing
        const org = await pool.query(`SELECT * FROM organization WHERE
        organization_name = $1 and 
        organization_street_address = $2 and
        organization_barangay_address = $3 and
        organization_municipality_address = $4 and
        organization_province_address = $5`, 
        [
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address
        ])

        if (org.rows.length > 0) {
            return res.status(401).send("Organization already exists")
        }

        const newOrganization = await pool.query(`
        INSERT INTO organization (
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address
        ]);
        await pool.query(
            `UPDATE users SET organization_id = $1, is_citizen = FALSE WHERE user_id = $2 RETURNING*`,
            [newOrganization.rows[0].organization_id, req.user.user_id]
        )
        res.json(newOrganization.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

const updateOrganization = async (req, res) => {
    try {
        const {id} = req.params
        const {
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address
        } = req.body

        const updatedOrganization = await pool.query(`
        UPDATE organization SET 
        (
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address,
            updated_at
        ) = ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        WHERE organization_id = $6 RETURNING*`,
        [
            organization_name,
            organization_street_address,
            organization_barangay_address,
            organization_municipality_address,
            organization_province_address,
            id
        ])
        res.json(updatedOrganization.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

const deleteOrganization = async (req, res) => {
    try {
        const {id} = req.params

        const deletedOrganization = await pool.query(
            `DELETE FROM organization WHERE organization_id = $1 and user_id = $2`,[Number(id), req.user.user_id])
        res.json(`Organization id# ${id} deleted`)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

export {getOrganization, postOrganization, deleteOrganization, updateOrganization}