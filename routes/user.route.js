const express=require('express');
const user=require('../module/user.model')
const route=express.Router();

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
        return response.status(500).json({message:"oops something went wrong"});
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
            return response.status(201).json({message:"invailid user try again"})
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


module.exports=route;