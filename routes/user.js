const express = require('express')
const router = express.Router();
const { User } = require('../models')
const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
    const saltRounds = 10; //
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  
/* encontrar todos los usuarios */ 
router.get('/', async (req, res) => {
    try{
      const users = await User.find()
      res.status(200).send({data:users})
    }  
    catch(error){
      res.status(404).send({error:'User not found'})
    }
    })



/* encontrar usuario por id  */ 
router.get('/:id', async (req, res) => {
    try{
      const user = await User.findById(req.params.id)
      res.status(200).send({data:user})
    }  
    catch(error){
      res.status(404).send({error:'User not found'})
    }
    })
    /* Editar usuario */
    router.put('/:id', async (req, res) => {
      try{
         await User.findByIdAndUpdate(req.params.id, req.body)
          res.status(200).send({data: 'update was successfull' })
      }
      catch(error){
        res.status(500).send({error:'Failed to update'})
      }
      })
  /* Agregar usuario */
  router.post('/', async (req,res,next)=>{
    const { password, email, name, lastName} = req.body
    const hashed = await hashPassword(password)
    const user = { 
        password: hashed,
         email,
         name,
         lastName}
    try{
      await User.create(user)
      res.sendStatus(201)
    }
    catch(error){
      res.status(500).send({error: error.message})
    }
  })
  
module.exports = router