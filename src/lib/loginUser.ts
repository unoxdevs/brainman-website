import db from "./pocketbase";
import toast from "svelte-french-toast";

export default async function loginUser(username: string, password: string) {
    try {
        await db.collection("users").authWithPassword(username, password);
        toast.success("Login successful!");
    } catch (error) {
        toast.error("Invalid username or password");
    }
}