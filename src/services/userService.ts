import userRepository from "../repositories/userRepository";
import { UserDataEntry } from "../types";

async function login(dataEntry:UserDataEntry){
    const userFound = await userRepository.getUser(dataEntry.email);
}

async function register(dataEntry:UserDataEntry){
    await userRepository.createUser(dataEntry);
}

const userService = {
    login,
    register
}

export default userService;