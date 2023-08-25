import express from "express";
import { authRegister, loginUser, logoutUser, readUser } from "../controller/auth/authController";


const router = express.Router()

/*------------------------------------- TEMP -------------------------------- */
router.get('/v1/users', readUser)
/*------------------------------------- TEMP -------------------------------- */
/* REGISTER */
router.post('/v1/register', authRegister)

/* LOGIN */
router.post('/v1/login', loginUser)

/* LOGOUT */
router.post('/v1/logout', logoutUser);






export default router