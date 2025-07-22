import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";

const registerUser = async (email: string, username: string, password: string) => {
    const existingEmail = await prisma.user.findUnique({
        where: {email}
    });

    if(existingEmail){
        throw new Error("email already used")
    }

    const existingUsername = await prisma.user.findUnique({
        where: {username}
    });

    if(existingUsername){
        throw new Error("username already used")
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hash
        }
    })

    return {
        id: user.id,
        email: user.email,
        username: user.username
    }
}

export default {
    registerUser
}