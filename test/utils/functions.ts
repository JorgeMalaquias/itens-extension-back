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
export async function itemSeed(){
    await prisma.item.createMany({
        data:[
            {
                name: "algum item 1",
                description: "um texto descrevendo do que se trata o item 1"
            },
            {
                name: "algum item 2",
                description: "um texto descrevendo do que se trata o item 2"
            },
            {
                name: "algum item 3",
                description: "um texto descrevendo do que se trata o item 3"
            },
            {
                name: "algum item 4",
                description: "um texto descrevendo do que se trata o item 4"
            },
            {
                name: "algum item 5",
                description: "um texto descrevendo do que se trata o item 5"
            },
            {
                name: "algum item 6",
                description: "um texto descrevendo do que se trata o item 6"
            },
            {
                name: "algum item 7",
                description: "um texto descrevendo do que se trata o item 7"
            },
            {
                name: "algum item 8",
                description: "um texto descrevendo do que se trata o item 8"
            }
        ]
    })
}
export async function generateUser(){
    const user = {
        email: faker.internet.email(),
        password: faker.word.noun()
    };
    return user;
} 