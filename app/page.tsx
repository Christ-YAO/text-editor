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
import "./App.css";

export default function Home() {

  const [values, setValues] = useState<z.infer<typeof formSchema>>({
    title: "",
    price: 0,
    description: "",
  });

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
      // .max(1000, { message: "Its too loong" })
      .trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 0,
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
    <main className="py-14 px-4 md:px-24 max-w-3xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-semibold mb-10 italic  w-fit">~ <span className="bg-accent/20 p-2 rounded mx-2">BlockNotes</span> ~</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extralight">Title</FormLabel>
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
                <FormLabel className="font-extralight">Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
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
                <FormLabel className="font-extralight">Description</FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={'outline'} className="font-extralight">Submit</Button>
        </form>
      </Form>

      {values.title !== "" && values.price !== 0 && values.description !== ""
        ?
        <>
          <div className="w-full">
            <div className="mt-16 mb-10 italic mx-auto flex items-center gap-4 justify-between w-full">
              <div className="bg-accent/10 h-0.5 mx-2 flex-1 w-2"></div>
              <span className="bg-accent/20 p-2 rounded flex-1 text-center">Values</span>
              <div className="bg-accent/10 h-0.5 flex-1 w-2"></div>
            </div>
          </div>

          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <div className="border border-accent/15 bg-accent/5 rounded-[2px] px-3 py-2 space-y-4">
            <p className="text-xl">{values.title}</p>
            <p>{values.price} $</p>
            <HtmlContent content={values.description} />
          </div>
        </>
        :
        null}
    </main>
  );
}
