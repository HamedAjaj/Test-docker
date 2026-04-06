const express = require('express');
//const mongoose = require('mongoose');
const redis  = require('redis');
const  {Client} = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const Redis_Host = 'redis' //'
const Redis_Port = 6379
const redisclient = redis.createClient({
   url: `redis://${Redis_Host}:${Redis_Port}`,
});
redisclient.on('error', (err) => console.log('Redis Client Error', err));
redisclient.on('connect', () => console.log('Redis Client Connected'));
redisclient.connect();

// // Create Redis client
// const redisClient = createClient({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.on('connect', () => console.log('Redis Client Connected'));

// app.get('/', async (req, res) => {
//   try {
//     // Example: increment visit counter in Redis
//     const visits = await redisClient.incr('visits');
//     res.send(`Hello, World! Total visits: ${visits}`);
//   } catch (err) {
//     console.error(err);
//     res.send('Error connecting to Redis');
//   }
// });

app.get('/', (req, res) => {
  redisclient.set('greeting', 'greetingssss!');
  res.send('Hello, World!');
});


app.get('/data', async (req, res) => {
  const greeting = await redisclient.get('greeting');
  res.send(`Hello, World! <h1> hhi <h2> ${greeting} </h2></h1> `);
});
app.listen(port, () => {
  console.log(`Server is running on port s s ${port}`);
});
// Connect to MongoDB
const DB_USER = 'root'
const DB_PASSWORD= 'example'
// const DB_Port = '27017'
const DB_Port = '5423'
//const Db_Host = 'mongo' //'172.18.0.2' // can use mongo name instead of ipaddress if using docker-compose
const Db_Host = 'postgres' //'172.18.0.2' // can use mongo name instead of ipaddress if using docker-compose
//const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${Db_Host || 'localhost'}:${DB_Port || 27017}/`;
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${Db_Host || 'localhost'}:${DB_Port || 5423}/`;

const pgClient = new Client({connectionString: url});
pgClient.connect().then(() => console.log('Connected to PostgreSQL'))
.catch(err => console.error('Could not connect to PostgreSQL', err));
 
// mongoose.connect(URI).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

  