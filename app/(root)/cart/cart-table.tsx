'use client';

import { Cart } from '@/types';

const CartTable = ({ cart }: { cart?: Cart }) => {
  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
    </>
  );
};

export default CartTable;