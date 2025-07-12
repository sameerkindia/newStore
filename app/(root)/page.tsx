import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import { ProductCarousel } from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
// import sampleData from '@/db/sample-data'
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Homepage() {
  const latestProduct = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  // const data = await fetch(`http://localhost:3000/api/find-user`)
  // const response = await fetch("http://localhost:3000/api/find-user", {
  //   method: "POST",
  //   body: JSON.stringify({ email: "abc@gmail.com" }),
  // });

  // const data = await response.json()

  // console.log("this is response" , data)

  return (
    <div className="space-y-8">
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList title="Newest Arrivals" data={latestProduct} />
      <ViewAllProductsButton />
      <IconBoxes />
      <DealCountdown />
    </div>
  );
}
