const express = require('express')
const router = express.Router();
const { Album } = require('../models')
// const {validate} = require('../middleware/validate')


/* listar todos los albums */
router.get('/', async (req,res,next)=>{
    try{
      const albums = await Album.find()
      res.status(200).send({data:albums})
    }
    catch(error){
      res.status(404).send({error:'There is nothing here'})
    }
  })

/* agregar un album */ 
router.post('/', async (req,res,next)=>{
    try{
      await Album.create(req.body)
      res.sendStatus(201)
    }
    catch(error){  res.status(500).send({error: error.message})
    }
  })

/*encontrar album por titulo*/ 

router.get('/:id', async (req,res,next)=>{
    try{
      // const title = req.params.album[0].toUpperCase() + req.params.album.slice(1)
      const { id } = req.params
      const album = await Album.findById(id)
      res.status(200).send({data:album})
    }
    catch(error){
      res.status(404).send({error:'Could not find this album'})
    }
  })
   /* Editar album */
  router.put('/:id', async (req, res) => {
    try{
       await Album.findByIdAndUpdate(req.params.id, req.body)
       const updatedAlbum = await Album.findById(req.params.id)
      res.status(200).send({data: updatedAlbum})
    }
    catch(error){
      res.status(500).send({error:'Failed to update'})
    }
    })
   /* Borrar  album  */
   router.delete('/:id', async (req, res) => {
    try{
       await Album.findByIdAndRemove(req.params.id)
      res.sendStatus(204)
    }
    catch(error){
      res.status(500).send({error:'Failed to delete'})
    }
    })
  /* Encontrar album que tiene la cancion */
  router.get('/album/:song', async (req,res,next)=>{
    try{
      const songTitle = req.params.song[0].toUpperCase() + req.params.song.slice(1)
      const album = await Album.find({ "songs.title" : songTitle})
      res.status(200).send({data:album})
    }
    catch(error){
      res.status(404).send({error:'Could not find this album'})
    }
  })
  
  module.exports = router  