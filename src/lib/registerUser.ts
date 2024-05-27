import db from "./pocketbase";
import toast from "svelte-french-toast";

export default async function registerUser(username: string, email: string, password: string, rePassword: string) {
    if (password !== rePassword) {
        toast.error("Passwords do not match");
        return;
    }

    try {
        await db.collection("users").create({
            username: username,
            email: email,
            emailVisibility: false,
            password: password,
            passwordConfirm: rePassword
        });
        toast.success('Account created successfully!');
    } catch (error) {
        toast.error("Failed to create account");
    }
}