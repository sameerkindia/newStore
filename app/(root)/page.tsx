import { ProductCarousel } from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
// import sampleData from '@/db/sample-data'
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Homepage() {
  const latestProduct = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-8">
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList title="Newest Arrivals" data={latestProduct} />
    </div>
  );
}
