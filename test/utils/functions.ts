import { prisma } from "../../src/database/prisma";

export async function cleanDatabase() {
    await prisma.user.deleteMany({});
    await prisma.item.deleteMany({});
  }