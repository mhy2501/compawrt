import pg from "pg"

function connectDatabase() {
	const pool = new pg.Pool ({
        user: 'postgres',
		password: '1234',
		database: 'capstone-project',
		host: 'localhost',
		port: 5432
    })
		return pool

}
export {connectDatabase}