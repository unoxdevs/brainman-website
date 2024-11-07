import axios from "axios";

export function chat(prompt: string, version: string) {
    const response = axios.post("https://brainman.is-a-cool.dev/api/" + version + "/chat", {
        message: prompt
    });
    return response;
}