"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/Tiptap";
import { useState } from "react";
import HtmlContent from "@/components/HtmlContext";

export default function Home() {

  const [values, setValues] = useState<z.infer<typeof formSchema>>({
    title: "",
    price: 0,
    description: "",
  });

  // const htmlString = `
  //   <h1>Bonjour!</h1>
  //   <p>Ceci est un <strong>texte</strong> avec des balises HTML.</p>
  //   <ul>
  //     <li>Item 1</li>
  //     <li>Item 2</li>
  //   </ul>
  // `;

  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Hey, the title is not long enough" })
      .max(100, { message: "Its too loong" })
      .trim(),
    price: z
      .string()
      .min(1, { message: "Hey, the price is not long enough" })
      .refine((value) => !isNaN(Number(value)), { message: "Invalid price" })
      .transform(Number),
    description: z
      .string()
      .min(5, { message: "Hey, the description is not long enough" })
      .max(1000, { message: "Its too loong" })
      .trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 29.99,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    setValues(values);
  }

  return (
    <main className="py-14 px-4 md:px-24 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={'outline'}>Submit</Button>
        </form>
      </Form>
      <hr className="my-8" />

      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
      <div className="border border-accent/50 bg-accent/15 rounded-[2px] px-3 py-2">
        <p className="text-xl">{values.title}</p>
        <p>{values.price} $</p>
        <HtmlContent content={values.description} />
      </div>
    </main>
  );
}
