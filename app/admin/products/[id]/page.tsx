import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from '@/lib/actions/product.actions';
import UpdateProductForm from '@/components/admin/update-product-form';

export const metadata: Metadata = {
  title: 'Update product',
};

const UpdateProductPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h1 className='h2-bold'>Update Product</h1>
      <UpdateProductForm product={product} productId={product.id} />
    </div>
  );
};

export default UpdateProductPage;