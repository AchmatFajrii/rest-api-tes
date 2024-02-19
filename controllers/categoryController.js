const prisma = require("../config/prisma")

const CreateCategory = async (req,res)=>{
  // #swagger.tags = ['Category']
  let {name} = req.body

  if (name !== undefined){
   try {
    let category = await prisma.category.create({
      data: {name}
    })
    res.json({category, info: "Category was successfully created"})
   }catch(err){
    res.status(500).json({err})
   }
  }else{
    res.status(400).json({
      error: "title and year is required"
    })
  }
}

const getCategories = async (req,res)=>{
  // #swagger.tags = ['Category']
  try{
    let categories = await prisma.category.findMany()
    res.json(categories)
  }catch(err){
    res.status(500).json({err})
  }
}

const getCategoryByid = async (req,res)=>{
  // #swagger.tags = ['Category']
  let {id} = req.params
  try{
    let category = await prisma.category.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (category){
      res.json(category)
    }else{
      res.status(404).json({info: "data not found"})
    }
  }catch(err){
    res.status(404).json({info: "data not found"})
  }

}

const updateCategory = async (req,res)=>{
  // #swagger.tags = ['Category']
  let {id} = req.params
  let {name} = req.body
  if (name !== undefined){
    try{
      let category = await prisma.category.update({
        where: {
          id: Number(id)
        },
        data:{
          name
        }
      })
      
      res.json({category, info: "Category was successfully updated"})

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

const deleteCategory = async (req,res)=>{
  /* #swagger.security = [{
      "bearerAuth": []
  }] */
  // #swagger.tags = ['Category']
  let {id} = req.params
  try{
    await prisma.category.deleteMany({
      where:{
        id: Number(id)
      }
    })
    res.json({info: "Category was successfully deleted"})
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

module.exports ={
  CreateCategory,
  getCategories,
  getCategoryByid,
  updateCategory,
  deleteCategory
}