"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";
// import { useToast } from '@/hooks/use-toast';
// import { ToastAction } from '@/components/ui/toast';
// import { addItemToCart } from '@/lib/actions/cart.actions';
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      // Execute the addItemToCart action
      const res = await addItemToCart(item);

      // Display appropriate toast message based on the result
      if (!res.success) {
        toast.error(res.message, {
          style: {
            background: "red",
            color: "white",
          },
        });
        return;
      }

      toast(res.message, {
        className: "bg-primary text-white hover:bg-gray-800",
        action: {
          // className='bg-primary text-white hover:bg-gray-800',
          label: "Go to cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast(res.message);
      // {
      //   variant: res.success ? 'default' : 'destructive',
      //   description: res.message,
      // }

      return;
    });
  };

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to cart
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
