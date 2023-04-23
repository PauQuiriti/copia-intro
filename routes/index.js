const express = require('express')
const router = express.Router();
const { User, Album } = require('../models')
const bcrypt = require('bcrypt')
const userRoutes = require('./user')
const bandRoutes = require('./band')
const jwt = require('jsonwebtoken')
const secret = 'hola_como_va'

function validate(req, res, next) {
  const token = req.cookies.token;
  const { payload } = jwt.verify(token, secret);
  req.user = payload;
  if (payload) return next();
  res.sendStatus(401); // Unauthorized
}

router.use('/user', userRoutes)
router.use('/band', bandRoutes)


/* login */
router.post('/login', async (req,res,next)=>{
  try{
      const {password,email,name, lastName, _id} = await User.findOne({"email":req.body.email})
      const match = await bcrypt.compare(req.body.password, password);
      const payload = {email, name, lastName, id:_id}
      if(match){
        const token = jwt.sign(payload, secret)
        res.cookie('token',token)
        res.status(200).send(payload)
      }
     else{
      res.status(404).send({message:'Wrong email or password'})
     }
  }
  catch(error){
    res.status(401).send({error:'Unauthorized'})
  }
})

router.post('/validate', async (req,res,next)=>{
  try{
      const {token} = req.body
      const { payload } = jwt.verify(token, secret);
      if(payload){
        res.status(200).send({user:payload})
      }
  }
  catch(error){
    res.status(401).send({error:'Unauthorized'})
  }
})

module.exports = router