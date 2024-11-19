import axios from "axios";

export async function chat(prompt: string) {
    const url = 'https://brainman.is-a-cool.dev/api/v1/chat';

    const payload = {
        message: prompt,
    };

    try {
        const response = await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
            validateStatus: (status) => status === 200,
            maxRedirects: 5,
            timeoutErrorMessage: "Request timed out. Please try again.",
        });

        if (!response.data || !response.data.answer) {
            throw new Error('Invalid response format from server');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timed out. Please try again.');
            } else if (error.response) {
                throw new Error(error.response.data?.error || 'Server error occurred');
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection.');
            }
        }
        throw error;
    }
}