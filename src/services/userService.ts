import userRepository from "../repositories/userRepository";
import { UserDataEntry } from "../types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sanitizedConfig from "../config";

async function login(dataEntry:UserDataEntry){
    const userFound = await userRepository.getUser(dataEntry.email);
    if(userFound===null){
        throw ({ name: 'not_found', message: 'The informed email does not belong to any registered user!' });
    }

    if (userFound && checkPassword(dataEntry.password,userFound.password)) {
        return generateToken(userFound.id);
    }

    throw ({ name: 'unauthorized', message: 'Invalid Credentials' });
}
async function register(dataEntry:UserDataEntry){
    const userFound = await userRepository.getUser(dataEntry.email);
    if(userFound!==null){
        throw ({ name: 'conflict', message: 'The informed email is already been used!' });
    }
    const finalData = {
        email: dataEntry.email,
        password: generateHashedPassword(dataEntry.password)
    }
    await userRepository.createUser(finalData);
}

function generateHashedPassword(password:string){
    return bcrypt.hashSync(password, 10);
}

function checkPassword(password:string,hashedPassword:string){
    return bcrypt.compareSync(password,hashedPassword);
}

function generateToken(id:number){
    const oneWeekInSeconds = 60 * 60 * 24 * 7;
    const jwtKey:string = sanitizedConfig.JWT_SECRET;
    const tokenConfig = { expiresIn: oneWeekInSeconds };
    const userInfo = { id };
    const token = jwt.sign(userInfo, jwtKey, tokenConfig);
    return token;
}

const userService = {
    login,
    register
}

export default userService;