import express from 'express'
import {auth} from "../middleware/auth.js"
import {getUser, loginUser, registerUser, verifyUser, deleteUser, updateUser} from './users.js'
import {getReport, postReport, deleteReport, updateReport} from './report.js'
import {getOrganization, postOrganization, deleteOrganization, updateOrganization} from './organization.js'
import {getAnimalInfo, postAnimalInfo, deleteAnimal, updateAnimalInfo} from './animal_info.js'

const router = express.Router()

router.get('/user', auth, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/verify', auth, verifyUser)
router.delete('/user', auth, deleteUser)
router.put('/user', auth, updateUser)

router.get('/reports', auth, getReport)
router.post('/report', auth, postReport)
router.delete('/report/:id', auth, deleteReport)
router.put('/report/:id', auth, updateReport)

router.get('/organization', getOrganization)
router.post('/organization', postOrganization)
router.delete('/organization/:id', auth, deleteOrganization)
router.put('/organization/:id', auth, updateOrganization)

router.get('/animal_infos', auth, getAnimalInfo)
router.post('/animal_info', auth, postAnimalInfo)
router.delete('/animal_info/:id', auth, deleteAnimal)
router.put('/animal_info/:id', auth, updateAnimalInfo)

export {router}