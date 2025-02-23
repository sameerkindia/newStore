"use server";

import {prisma} from '@/db/prisma'
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";

// get latest product

export async function getLatestProducts(){
  // const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCT_LIMIT,
    orderBy: {createdAt: 'desc'}
  })

  return convertToPlainObject(data);
}

