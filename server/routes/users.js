var express = require('express');
var router = express.Router();

/* GET users */
router.get('/', (req, res, next) => {
  res.locals.connection.query('SELECT * from users', (error, results, fields) => {
		if(error) throw error
		res.send(JSON.stringify(results))
	})
})

/* GET user */
router.get('/get', async (req, res, next) => {
	const user = await getUser(res.locals.connection, req.query.google_id)

	if (user === null) 
		res.send(JSON.stringify({ success: false, msg: 'User not found by that Google ID.' }))

	res.send(JSON.stringify({ ...user, success: true }))
})

/* UPDATE user */
router.post('/', async (req, res, next) => {
	try {
		await updateUser(res.locals.connection, req.body)
		const user = await getUser(res.locals.connection, req.body.google_id)
		res.send(JSON.stringify({ ...user, success: true, msg: 'User updated successfully.' }))

	} catch(err) {
		res.send(JSON.stringify({ success: false, msg: 'Failed to update user.' }))
	}

})

getUser = async (db, google_id) =>  {
	const rows = await db.query(`SELECT * from users WHERE google_id='${google_id}'`)

	if (rows.length === 0) return null

	return rows[0]
}

updateUser = async (db, { google_id, monthlyIncome }) => {
	let userData = await getUser(db, google_id)

	if (! userData) {
		userData = await db.query(`INSERT INTO users (google_id, monthly_income) VALUES ('${google_id}', '1000.0')`)
	} else if (userData && monthlyIncome !== -5555) {
		userData = await db.query(`UPDATE users SET monthly_income='${monthlyIncome}' WHERE google_id='${google_id}'`) 
	}
}

module.exports = router;
