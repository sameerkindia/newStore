"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { ControllerRenderProps, SubmitHandler } from "react-hook-form";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
// import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";

const CreateProductForm = ({
  // type,
  product,
  productId,
}: {
  // type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: productDefaultValues,
  });

  // Handle form submit
  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    const res = await createProduct(values);
    console.log(res, "this was create");
    if (!res.success) {
      toast(res.message);
    } else {
      toast(res.message);
      router.push(`/admin/products`);
    }
  };

  const images = form.watch('images');


  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "name"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "slug"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter product slug"
                      className="pl-8"
                      {...field}
                    />
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-1 mt-2 hover:bg-gray-600"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "category"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "brand"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "price"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "stock"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row">
        <FormField
        control={form.control}
        name='images'
        render={() => (
          <FormItem className='w-full'>
            <FormLabel>Images</FormLabel>
            <Card>
              <CardContent className='space-y-2 mt-2 min-h-48'>
                <div className='flex-start space-x-2'>
                  {images.map((image: string) => (
                    <Image
                      key={image}
                      src={image}
                      alt='product image'
                      className='w-20 h-20 object-cover object-center rounded-sm'
                      width={100}
                      height={100}
                    />
                  ))}
                  <FormControl>
                    <UploadButton
                      endpoint='imageUploader'
                      onClientUploadComplete={(res: { url: string }[]) => {
                        form.setValue('images', [...images, res[0].url]);
                      }}
                      onUploadError={(error: Error) => {
                        toast(`ERROR! ${error.message}`);
                      }}
                    />
                  </FormControl>
                </div>
              </CardContent>
            </Card>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>
        <div className="upload-field">{/* Is Featured */}</div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "description"
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Subitting" : `Create Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;



// let form;

  // if(type === "Update"){
  //   form = useForm<z.infer<typeof updateProductSchema>>({
  //       resolver:zodResolver(updateProductSchema),
  //       defaultValues: product,
  //     })
  // }else{
  //   form = useForm<z.infer<typeof insertProductSchema>>({
  //     resolver:zodResolver(insertProductSchema),
  //     defaultValues: productDefaultValues,
  //   })
  // }

  // const form = useForm<z.infer<typeof insertProductSchema>>({
  //   resolver:
  //     type === "Update"
  //       ? zodResolver(updateProductSchema)
  //       : zodResolver(insertProductSchema),
  //   defaultValues:
  //     product && type === "Update" ? product : productDefaultValues,
  // });