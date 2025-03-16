import CreateProductForm from '@/components/admin/create-product-form';
import ProductForm from '@/components/admin/create-product-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create product',
};

const CreateProductPage = () => {
  return (
    <>
      <h2 className='h2-bold'>Create Product</h2>
      <div className='my-8'><CreateProductForm /></div>
    </>
  );
};
export default CreateProductPage;