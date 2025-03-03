'use server';

import { CartItem } from '@/types';


// @ts-ignore
// export async function addItemToCart(data: CartItem) {
//   return {
//     success: true,
//     message: 'Item added to the cart',
//   };
// };

export const addItemToCart = async (data: CartItem) => {
    return {
      success: true,
      message: 'Item added to the cart',
    };
  };