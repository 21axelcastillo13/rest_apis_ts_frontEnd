import { array, boolean, number, object, string } from "valibot"

import * as v from 'valibot';

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id:number(),
    name: string(),
    price: number(),
    availability: boolean()
})
export const ProductsSchema =  array(ProductSchema)
export type Product =v.InferOutput<typeof ProductSchema>