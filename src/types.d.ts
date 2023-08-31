import { Item } from "@prisma/client";

type ItemDataEntry = Omit<Item,"id">