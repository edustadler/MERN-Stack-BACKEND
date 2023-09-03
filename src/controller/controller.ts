import { response } from "express";
import { connection } from "../config/database";
import CrudData from "../models/crudModels";

//read crud item
export const readData = async (req: any, res: any) => {
    const response = res.status(200)
    const crudList = await CrudData.find()
    try {
        return response.json(crudList)        
    } catch (error) {
        console.error(error)
    }
}

//create crud item
export const createData = async (req: any, res: any) => {
    const response = res.status(200)
    const { title, category, value, type } = req.body

    if (!value) {
        return res.status(400).json({ error: 'Valor' })
    }
    const dataCreated = await CrudData.create({
        title,
        category,
        value,
        type

    })

    return response.json(dataCreated)
}


//delete crud item
export const deleteData = async (req: any, res: any) => {
    const response = res.status(200)
    const { id } = req.params
    const dataDeleted = await CrudData.findOneAndDelete({
        _id: id
    })

    try {
        return response.json(dataDeleted)
    } catch (error) {
        console.error(error)
    }
}

//create crud item
export const updateData = async (req: any, res: any) => {
    const response = res.status(200);
    const { id } = req.params;
    const { title, category, value, type } = req.body

    try {
        const updatedData = await CrudData.findByIdAndUpdate(
            {
                _id: id
            },
            {
                title,
                category,
                value,
                type
            },
            { new: true });

        return response.json(updatedData);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'An error occurred during update' });
    }
}