const { Router } = require('express');
const express=require('express');
const user=require('../module/user.model')
const route=express.Router();
const multer = require("multer");
const Category = require("../module/category.model");

route.post('/signup',(request,response)=>{
    console.log("hello");
    console.log(request.body);
    user.create({
        username:request.body.username,
        email:request.body.email,
        password:request.body.password
    }).then(result=>{
        console.log(result)
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:"signup faild"});
    })
})

route.post('/signin',(request,response)=>{
    console.log(request.body);
    user.findOne({
        email:request.body.email,
        password:request.body.password
    }).then(result=>{
        if(result){
            return response.status(200).json({message:"login success",result})
        } 
        else{
            return response.status(201).json({err:"invailid user try again"})
        }
    }).catch(err=>{
        return response.status(500).json({message:"ooops something went wrong"})
    })
})

route.get('/user-list',(request,response)=>{
    user.find().then(result=>{
        console.log(result);
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err)
        return response.status(500).json({message:"oops something went wrong"})
    })
})

var storage=multer.diskStorage({
    destination:'public/images',
    filename:function(request,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});

var upload=multer({storage:storage});

route.post("/add-category",upload.single("image"),(request,response)=>{
    Category.create({
        name  : request.body.name,
        image : "https://apitesting12.herokuapp.com/images/"+request.file.filename
    }).then(result=>{
        return response.json(result);
    }).catch(err=>{
        return response.json({err:err});;
    })
})

module.exports=route;