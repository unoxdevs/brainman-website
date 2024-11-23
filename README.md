# Brainman Chat

A modern, context-aware AI chat application built with **SvelteKit** and **TailwindCSS**. Experience natural conversations with an AI assistant in a beautiful, responsive interface.

## ✨ Features

### 💬 Chat Interface
- **Session Management**:
  - Persistent chat history with localStorage
  - Multiple chat sessions support
  - Session titles based on first message
- **Message Handling**:
  - Real-time message updates
  - User and assistant message differentiation
  - Message timestamps and counts
- **Responsive Design**:
  - Mobile-first approach
  - Adaptive layout for all screen sizes
  - Touch-friendly interface

### 🎨 Modern UI/UX
- **Sleek Design**:
  - Dark theme with glass-morphism effects
  - Custom button hover states
  - Responsive navigation bar
- **Interactive Elements**:
  - Smooth transitions and animations
  - Loading states and error handling
  - Intuitive history management
- **Chat History**:
  - Clear all sessions functionality
  - Individual session deletion
  - Session preview with message counts

### 🛠 Technical Features
- **State Management**:
  - Svelte stores for chat sessions
  - Persistent storage with localStorage
  - Efficient session updates
- **Error Handling**:
  - Network timeout management
  - Server error handling
  - Connection status feedback
- **API Integration**:
  - RESTful API communication
  - Axios for HTTP requests
  - Timeout and retry logic

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/unoxdevs/brainman-website.git
   cd brainman-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Technologies

- **Frontend**:
  - [SvelteKit](https://kit.svelte.dev/): Modern web application framework
  - [TailwindCSS](https://tailwindcss.com/): Utility-first CSS framework
  - [Remix Icons](https://remixicon.com/): Icon library for UI elements
  
- **Network**:
  - [Axios](https://axios-http.com/): HTTP client with timeout and error handling

## 📦 Project Structure

```
brainman-web/
├── src/
│   ├── components/
│   │   ├── Banner.svelte     # Main chat interface component
│   │   ├── ChatHistory.svelte # Chat history management
│   │   ├── Footer.svelte     # Application footer
│   │   └── Navbar.svelte     # Navigation and controls
│   ├── lib/
│   │   └── chat.ts          # API integration and error handling
│   ├── stores/
│   │   └── chatStore.ts     # Chat state management
│   └── routes/              # SvelteKit routes
└── static/                  # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the Svelte and TailwindCSS communities