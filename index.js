const express=require('express');
const authRoute=require('./routes/auth')
const postRoute=require('./routes/posts') 
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

const app=express();

//Connect To Db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true },()=>console.log('connected to Db'))

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(5000,()=>console.log('Server running on port 5000'));