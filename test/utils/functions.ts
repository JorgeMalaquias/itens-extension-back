import { prisma } from "../../src/database/prisma";
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function cleanDatabase() {
    await prisma.user.deleteMany({});
    await prisma.item.deleteMany({});
}

export async function userSeed(){
    await prisma.user.createMany({
        data:[
            {
                email: faker.internet.email(),
                password: faker.word.noun()
            },
            {
                email: faker.internet.email(),
                password: faker.word.noun()
            },
            {
                email: faker.internet.email(),
                password: faker.word.noun()
            },
            {
                email: faker.internet.email(),
                password: faker.word.noun()
            },
            {
                email: faker.internet.email(),
                password: faker.word.noun()
            },
            {
                email: faker.internet.email(),
                password: faker.word.noun()
            },
        ],
    })
}

export async function generateUser(){
    const user = {
        email: faker.internet.email(),
        password: faker.word.noun().length.toFixed(15)
    };
    const newUser = await prisma.user.create({
        data:{
            email: user.email,
            password: bcrypt.hashSync(user.password,10)
        }
    })
    return {user,newUser};
} 

export async function itemSeed(){
    await prisma.item.createMany({
        data:[
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50).length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            },
            {
                name: faker.word.noun().length.toFixed(14),
                description: faker.lorem.text().length.toFixed(50)
            }
        ]
    })
}

export function generateItem() {
    return {
        name: faker.word.noun(),
        description: faker.lorem.text()
    };
}