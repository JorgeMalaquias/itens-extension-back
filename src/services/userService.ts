import userRepository from "../repositories/userRepository";
import { UserDataEntry } from "../types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(dataEntry:UserDataEntry){
    const userFound = await userRepository.getUser(dataEntry.email);
    if(userFound===null){
        throw ({ type: 'not_found', message: 'The informed email does not belong to any registered user!' });
    }

    if (userFound && checkPassword(dataEntry.password,userFound.password)) {
        return generateToken(userFound.id);
    }

    throw ({ type: 'unauthorized', message: 'Invalid Credentials' });
}

async function register(dataEntry:UserDataEntry){
    const userFound = await userRepository.getUser(dataEntry.email);
    if(userFound!==null){
        throw ({ type: 'conflict', message: 'The informed email is already been used!' });
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
    const jwtKey:string = process.env.JWT_SECRET || 'xablau';
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