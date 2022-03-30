const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const userRoute=require('./routes/user.route')
const port=process.env.PORT ||3000;
const app=express();
const cors=require('cors')

mongoose.connect('mongodb+srv://luckyrao:1234@cluster1.bvxkm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log("success")
}).catch(err=>{
    console.log(err)
})

app.use(cors)
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());



app.use('/',userRoute);

app.listen(port,()=>{
    console.log('server is running')
})