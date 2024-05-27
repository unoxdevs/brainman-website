import { writable } from 'svelte/store';

export const userHistory = writable([] as { username: string; prompt: string; response: string; timestamp: number }[]);

export function addToHistory(username: string, prompt: string, response: string) {
    userHistory.update(history => {
        const newEntry = {
            username: username,
            prompt: prompt,
            response: response,
            timestamp: new Date().getTime()
        };
        history.push(newEntry);
        return history;
    });
}

export function clearHistory(): void {
    userHistory.set([]);
}