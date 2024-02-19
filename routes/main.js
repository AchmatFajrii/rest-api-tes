const express = require('express')
const { CreateMovie, getMovies, getMovieByid, updateMovie, deleteMovie } = require('../controllers/movieController')
const { register, login } = require('../controllers/authController')
const authenticateJWT = require('../middlewares/jwtAuth')
const { CreateCategory, getCategories, getCategoryByid, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { createActor, getActors, getActorById, updateActor, deleteActor } = require('../controllers/actorController')
const router = express.Router()


router.post('/movies', authenticateJWT, CreateMovie)
router.get('/movies', getMovies)
router.get('/movies/:id', getMovieByid)
router.patch('/movies/:id', authenticateJWT, updateMovie)
router.delete('/movies/:id', authenticateJWT, deleteMovie)



router.post('/categories', CreateCategory)
router.get('/categories', getCategories)
router.get('/categories/:id', getCategoryByid)
router.patch('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)

router.post('/actors', createActor)
router.get('/actors', getActors)
router.get('/actors/:id', getActorById)
router.patch('/actors/:id', updateActor)
router.delete('/actors/:id', deleteActor)

router.post('/register', register);
router.post('/login', login);

module.exports = router