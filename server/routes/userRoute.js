const express = require('express');
const mongoose = require("mongoose");


//model imported here
const User = require('../models/userModel');

const router = express.Router();


//create
router.post("/",async(req,res) => {

    const {name, email, age} = req.body;
try{
    const userAdded = await User.create({
        name:name,
        email:email,
        age:age,
    });
    console.log(userAdded);
    res.status(201).json(userAdded);
} catch (error){
    console.log(error);
  res.status(400).json({error:error.message});
}
});



//Get data
router.get("/",async(req,res)=>{

    try{
        const showAll = await User.find();
        res.status(200).json(showAll)
    } catch (error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
});


//Get single user
router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const singleUser = await User.findById({_id : id});
        res.status(200).json(singleUser)
    } catch (error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
});


//delete data
router.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete({_id : id});
        res.status(200).json(deletedUser)
    } catch (error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

//PUT/update
router.patch("/edit/:id",async(req,res)=>{
    const {id} = req.params;
    const {name,email,age} = req.body
    try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body,{new:true,});
        res.status(200).json(updatedUser)
    } catch (error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
});



module.exports = router;