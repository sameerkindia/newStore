"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
// import { useToast } from '@/hooks/use-toast';
// import { ToastAction } from '@/components/ui/toast';
// import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    // Execute the addItemToCart action
    const res = await addItemToCart(item);

    // Display appropriate toast message based on the result
    if (!res.success) {
      // toast({
      //   variant: 'destructive',
      //   description: res.message,
      // });
      toast.error(res.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }

    toast(`${item.name} added to the cart`, {
      className: "bg-primary text-white hover:bg-gray-800",
      action: {
        // className='bg-primary text-white hover:bg-gray-800',
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
      // action: (
      //   <ToastAction
      //     className='bg-primary text-white hover:bg-gray-800'
      //     onClick={() => router.push('/cart')}
      //     altText='Go to cart'
      //   >
      //     Go to cart
      //   </ToastAction>
      // ),
    });

    // toast({
    //   description: `${item.name} added to the cart`,
    //   action: (
    //     <ToastAction
    //       className='bg-primary text-white hover:bg-gray-800'
    //       onClick={() => router.push('/cart')}
    //       altText='Go to cart'
    //     >
    //       Go to cart
    //     </ToastAction>
    //   ),
    // });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
};

export default AddToCart;

// "use client"

// import { toast } from "sonner"

// import { Button } from "@/components/ui/button"

// export function SonnerDemo() {
//   return (
//     <Button
//       variant="outline"
//       onClick={() =>
//         toast("Event has been created", {
//           description: "Sunday, December 03, 2023 at 9:00 AM",
//           action: {
//             label: "Undo",
//             onClick: () => console.log("Undo"),
//           },
//         })
//       }
//     >
//       Show Toast
//     </Button>
//   )
// }
