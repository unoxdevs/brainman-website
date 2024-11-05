import axios from "axios";

export function chat(prompt: string) {
    const response = axios.post("https://brainman.is-a-cool.dev/api/chat", {
        message: prompt
    });
    return response;
}