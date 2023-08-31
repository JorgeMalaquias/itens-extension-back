import { Item, User } from "@prisma/client";

type ItemDataEntry = Omit<Item,"id">

type UserDataEntry = Omit<User,"id">

type ApplicationError = {
    type: string;
    message: string;
};