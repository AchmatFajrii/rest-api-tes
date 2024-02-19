const prisma = require("../config/prisma")

const createActor = async (req,res)=>{
  // #swagger.tags = ['Actor']
  let {name} = req.body

  if (name !== undefined){
   try {
    let actor = await prisma.actor.create({
      data: {name, inputTime: new Date("2011-04-20T09:30:51.01Z")}
    })
    res.json({actor, info: "actor was successfully created"})
   }catch(err){
    res.status(500).json({err})
   }
  }else{
    res.status(400).json({
      error: "title and year is required"
    })
  }
}

const getActors = async (req,res)=>{
  // #swagger.tags = ['Actor']
  try{
    let categories = await prisma.actor.findMany()
    res.json(categories)
  }catch(err){
    res.status(500).json({err})
  }
}

const getActorById = async (req,res)=>{
  // #swagger.tags = ['Actor']
  let {id} = req.params
  try{
    let actor = await prisma.actor.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (actor){
      res.json(actor)
    }else{
      res.status(404).json({info: "data not found"})
    }
  }catch(err){
    res.status(404).json({info: "data not found"})
  }

}

const updateActor = async (req,res)=>{
  // #swagger.tags = ['Actor']
  let {id} = req.params
  let {name} = req.body
  if (name !== undefined){
    try{
      let actor = await prisma.actor.update({
        where: {
          id: Number(id)
        },
        data:{
          name
        }
      })
      
      res.json({actor, info: "actor was successfully updated"})

    }catch(err){
      if (err.code === "P2025"){
        res.status(404).json({info: "data not found "})
      }else{
        res.status(500).json(err)
      }
    }
  }else{
    res.status(400).json({
      error: "title and year is required"
    })
  }
}

const deleteActor = async (req,res)=>{
  /* #swagger.security = [{
      "bearerAuth": []
  }] */
  // #swagger.tags = ['Actor']
  let {id} = req.params
  try{
    await prisma.actor.deleteMany({
      where:{
        id: Number(id)
      }
    })
    res.json({info: "actor was successfully deleted"})
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

module.exports ={
  createActor,
  getActors,
  getActorById,
  updateActor,
  deleteActor
}