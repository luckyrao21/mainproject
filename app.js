const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const userRoute=require('./routes/user.route')
const port=process.env.PORT ||3000;
const app=express();

mongoose.connect('mongodb+srv://lucky:y5QvxONsaSK9OD01@mycluster.rhrpn.mongodb.net/users?retryWrites=true&w=majority',()=>{
    console.log("connected")
})


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());



app.use('/',userRoute);

app.listen(port,()=>{
    console.log('server is running')
})