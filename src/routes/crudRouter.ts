import { createData, deleteData, readData, updateData } from "../controller/controller";
import express from "express";


const router = express.Router()


/* C */router.post('/v1/item', createData)
/* R */router.get('/v1/item', readData)
/* U */router.put('/v1/item/:id', updateData)
/* D */router.delete('/v1/item/:id', deleteData)




export default router