import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface ChatMessage {
    sender: 'user' | 'assistant';
    text: string;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    timestamp: number;
}

const storedSessions = browser ? JSON.parse(localStorage?.getItem('chatSessions') || '[]') : [];
export const chatSessions = writable<ChatSession[]>(storedSessions);
export const currentSessionId = writable<string | null>(null);

export function createNewSession(): string {
    const sessionId = Date.now().toString();
    chatSessions.update(sessions => {
        const newSessions = [{
            id: sessionId,
            title: 'New Chat',
            messages: [],
            timestamp: Date.now()
        }, ...sessions];
        
        if (browser) {
            localStorage.setItem('chatSessions', JSON.stringify(newSessions));
        }
        return newSessions;
    });
    currentSessionId.set(sessionId);
    return sessionId;
}

export function updateSession(sessionId: string, messages: ChatMessage[]) {
    if (!sessionId || messages.length === 0) return;

    chatSessions.update(sessions => {
        const firstUserMessage = messages.find(m => m.sender === 'user')?.text || 'New Chat';
        const title = firstUserMessage.length > 30 
            ? firstUserMessage.substring(0, 30) + '...' 
            : firstUserMessage;

        const sessionIndex = sessions.findIndex(s => s.id === sessionId);
        if (sessionIndex === -1) {
            sessions = [{
                id: sessionId,
                title,
                messages,
                timestamp: Date.now()
            }, ...sessions];
        } else {
            sessions[sessionIndex] = {
                ...sessions[sessionIndex],
                title,
                messages,
                timestamp: Date.now()
            };
        }

        if (browser) {
            localStorage.setItem('chatSessions', JSON.stringify(sessions));
        }
        return sessions;
    });
}

export function getActiveSession(): ChatSession | null {
    let currentId: string | null = null;
    currentSessionId.subscribe(id => currentId = id)();
    
    let sessions: ChatSession[] = [];
    chatSessions.subscribe(s => sessions = s)();
    
    if (!currentId) return null;
    return sessions.find(s => s.id === currentId) || null;
}