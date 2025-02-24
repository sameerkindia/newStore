import ProductList from "@/components/shared/product/product-list";
// import sampleData from '@/db/sample-data'
import { getLatestProducts } from "@/lib/actions/product.actions";


export default async function Homepage() {

  const latestProduct = await getLatestProducts()

  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={latestProduct}/>
    </div>
  );
}
