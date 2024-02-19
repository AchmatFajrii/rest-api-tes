const prisma = require("../config/prisma")

const CreateMovie = async (req,res)=>{
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /*  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/movieSchema"
                }  
            }
        }
    } 
  */
  // #swagger.tags = ['Movie']
  let {title, year} = req.body

  if (title !== undefined && year !== undefined){
   try {
    let movie = await prisma.movie.create({
      data: {title, year: Number(year), userId: req.user.id}
    })
    res.json({movie, info: "movie was successfully created"})
   }catch(err){
    res.status(500).json({err})
   }
  }else{
    res.status(400).json({
      error: "title and year is required"
    })
  }
}

const getMovies = async (req,res)=>{
  // #swagger.tags = ['Movie']
  try{
    let movies = await prisma.movie.findMany()
    res.json(movies)
  }catch(err){
    res.status(500).json({err})
  }
}

const getMovieByid = async (req,res)=>{
  // #swagger.tags = ['Movie']
  let {id} = req.params
  try{
    let movie = await prisma.movie.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (movie){
      res.json(movie)
    }else{
      res.status(404).json({info: "data not found"})
    }
  }catch(err){
    res.status(404).json({info: "data not found"})
  }

}

const updateMovie = async (req,res)=>{
  /* #swagger.security = [{
        "bearerAuth": []
  }] */
  // #swagger.tags = ['Movie']
  let {id} = req.params
  let {title, year} = req.body
  if (title !== undefined && year !== undefined){
    try{
      let movie = await prisma.movie.update({
        where: {
          id: Number(id)
        },
        data:{
          title, year
        }
      })
      
      res.json({movie, info: "movie was successfully updated"})

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

const deleteMovie = async (req,res)=>{
  /* #swagger.security = [{
      "bearerAuth": []
  }] */
  // #swagger.tags = ['Movie']
  let {id} = req.params
  try{
    await prisma.movie.deleteMany({
      where:{
        id: Number(id)
      }
    })
    res.json({info: "movie was successfully deleted"})
  }catch(err){
    res.status(404).json({info: "data not found"})
  }
}

module.exports ={
  CreateMovie,
  getMovies,
  getMovieByid,
  updateMovie,
  deleteMovie
}