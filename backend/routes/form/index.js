const express=require("express");
const router =express.Router();
const { pool } =require('../../config/connection');

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post('/form', async (req, res) => {
    const { fullName, email, message } = req.body?.data || {};
    
    try {
      if (!fullName || !email || !message) {
        return res.status(201).json({ status: 'error', error: 'All fields are required' });
      }

      if (!isValidEmail(email)) {
        return res.status(201).json({ status: 'error', error: 'Invalid email format' });
      }
    
      if (fullName.length > 255 || email.length > 255) {
        return res.status(201).json({ status: 'error', error: 'Full name or email too long' });
      }


      const [result] = await pool.query(
        `INSERT INTO form_submissions (fullName, email, message) VALUES (?, ?, ?)`,
        [fullName, email, message]
      );
      res.status(201).json({ status:'success', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database insert failed' });
    }
});

router.get('/form', async (_req, res) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM form_submissions ORDER BY createdAt DESC`);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database fetch failed' });
    }
});

module.exports=router;