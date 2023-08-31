import { prisma } from "../database/prisma";
import { UserDataEntry } from "../types";


async function getUser(email:string) {
    return await prisma.user.findUnique({
        where:{
            email
        }
    });
}

async function createUser(dataEntry:UserDataEntry){
    await prisma.user.create({
        data:{
            email: dataEntry.email,
            password: dataEntry.password
        }
    })
}

const userRepository = {
    getUser,
    createUser
}

export default userRepository;