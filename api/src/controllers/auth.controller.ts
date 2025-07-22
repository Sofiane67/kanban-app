import {Request, Response, NextFunction} from "express";
import authService from "../services/auth.service.";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, username, password} = req.body;

        if(!email || !username || !password){
            return res.status(400).json({error: "missing fields"})
        }

        const user = await authService.registerUser(email, username, password)
        res.status(201).json({ message: 'User created', user })

    } catch (error) {
        next(error)
    }
}

export default {
    register
}