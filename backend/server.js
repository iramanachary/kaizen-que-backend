const express = require('express');
const cors = require('cors');
const { pool, setupDatabase } = require('./config/connection.js');
const app=express();
const dotenv = require ('dotenv');
dotenv.config();

app.use(cors({
    origin: process.env.URL, 
    credentials: true,
    originmethods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization', 
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
pool.getConnection()
  .then(conn => {
    console.log('Database connected');
    setupDatabase();
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
const formApis=require('./routes/form/index');

app.use('/api',formApis);

app.listen(3001, ()=>{
    console.log('server started 3001');
})