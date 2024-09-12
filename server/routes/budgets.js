var express = require('express');
var router = express.Router();

/* GET budgets for user google_id */
router.get('/list', async (req, res, next) => {
	const budgets = await getBudgets(res.locals.connection, req.query.google_id)
	res.send(JSON.stringify(budgets))
})

/* GET budget by id */
router.get('/get', async (req, res, next) => {
	const budget = await getBudget(res.locals.connection, req.query.id)

	if (budget === null) 
		res.send(JSON.stringify({ success: false, msg: 'Budget not found by that ID.' }))

	res.send(JSON.stringify({ ...budget, success: true }))
})

/* CREATE budget */
router.post('/', async (req, res, next) => {
	try {
		await createBudget(res.locals.connection, req.body)
	} catch(err) {
		console.log(err)
		res.send(JSON.stringify({ success: false, msg: 'Failed to create budget.' }))
	}

	res.send(JSON.stringify({ success: true, msg: 'Budget created successfully.' }))
})


/* UPDATE budget */
router.post('/update', async (req, res, next) => {
	try {
		await updateBudget(res.locals.connection, req.body)
	} catch(err) {
		console.log(err)
		res.send(JSON.stringify({ success: false, msg: 'Failed to update budget.' }))
	}

	res.send(JSON.stringify({ success: true, msg: 'Budget updated successfully.' }))
})

/* DELETE budget */
router.post('/delete', async (req, res, next) => {
	try {
		await deleteBudget(res.locals.connection, req.body)
	} catch(err) {
		console.log(err)
		res.send(JSON.stringify({ success: false, msg: 'Failed to delete budget.' }))
	}

	res.send(JSON.stringify({ success: true, msg: 'Budget deleted successfully.' }))
})

/** ---------- FUNCTIONS --------- */
getBudget = async (db, id) =>  {
	const rows = await db.query(`SELECT * from budgets WHERE id='${id}'`)

	if (rows.length === 0) return null

	return rows[0]
}

getBudgets = async (db, google_id) => {
	return await db.query(`SELECT * FROM budgets WHERE google_id='${google_id}'`)
}

createBudget = async (db, { google_id, name, amount, fixed }) => {
	await db.query(`INSERT INTO budgets (name, amount, fixed, google_id) VALUES ('${name}', '${amount}', '${fixed ? 1 : 0}', '${google_id}')`) 
}

updateBudget = async (db, { id, name, amount, fixed }) => {
	await db.query(`UPDATE budgets SET name='${name}', amount='${amount}', fixed='${fixed}' WHERE id='${id}'`) 
}

deleteBudget = async (db, { id, transferId }) => {
	await db.query(`DELETE FROM budgets WHERE id='${id}'`) 
	await db.query(`UPDATE transactions SET budget_id='${transferId}' WHERE budget_id='${id}'`) 
}


module.exports = router;