import { supabase } from "./supabaseClient";

// use all funtions in try catch blocks

// account table
 export async function accountQuery(user:string, password:string) {
    return {user: user, password: password};
 }

// items table
 export async function itemNameQuery(itemName:string) {
    const {data, error} = await supabase.from("items").select().eq("name", itemName);
    
    if (error) throw error;

    return data;
 }

 export async function addItem(name:string, description:string, price:number, image:string, catagory:string) {
    const {data, error} = await supabase.from("items").insert({name:name, description:description, price:price, image:image, catagory:catagory}).select();

    if (error) throw error;

    return data;
 }