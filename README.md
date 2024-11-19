# Brainman Chat

A modern, context-aware AI chat application built with **SvelteKit** and **TailwindCSS**. Experience natural conversations with an AI assistant in a beautiful, responsive interface.

## ✨ Features

### 💬 Chat Interface
- **Context-Aware Conversations**: The assistant remembers previously shared information for more natural dialogue
- **Smart Message Formatting**: 
  - Syntax-highlighted code blocks
  - Inline code formatting
  - Automatic line breaks and spacing
- **Responsive Design**: Optimized for all devices (desktop, tablet, and mobile)
- **Real-time Feedback**:
  - Elegant loading indicators
  - Smooth message transitions
  - Auto-scroll to latest messages

### 🎨 Modern UI/UX
- **Sleek Design**:
  - Dark theme with gradient accents
  - Custom scrollbar styling
  - Shadow effects and rounded corners
- **Interactive Elements**:
  - Hover effects on buttons and messages
  - Smooth animations and transitions
  - Clear visual feedback for actions
- **Chat History**:
  - Session management with timestamps
  - Easy navigation between conversations
  - Clear session indicators

### 🛠 Technical Features
- **Performance Optimized**:
  - Efficient message rendering
  - Smooth scrolling behavior
  - Responsive input handling
- **Error Handling**:
  - Graceful error messages
  - Network error recovery
  - Input validation

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
  - [Remix Icons](https://remixicon.com/): Beautiful icon set
  
- **Network**:
  - [Axios](https://axios-http.com/): Promise-based HTTP client

## 📦 Project Structure

```
brainman-web/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Banner.svelte  # Main chat interface
│   │   ├── ChatHistory.svelte
│   │   └── Navbar.svelte
│   ├── lib/               # Utility functions
│   │   └── chat.ts        # Chat API integration
│   ├── routes/            # SvelteKit routes
│   └── stores/            # State management
├── static/                # Static assets
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the Svelte and TailwindCSS communities for their excellent documentation and tools