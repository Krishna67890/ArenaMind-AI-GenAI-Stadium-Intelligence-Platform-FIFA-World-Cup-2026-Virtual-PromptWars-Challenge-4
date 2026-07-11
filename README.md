# ArenaMind AI - The Future of Intelligent Stadium Operations

**ArenaMind AI** is a world-class, production-ready AI-powered Smart Stadium Operating System designed for global sporting events. This project is an original submission for **Virtual PromptWars Challenge 4**.

## 🚀 Mission
To revolutionize stadium operations and enhance the tournament experience for fans, organizers, volunteers, and venue staff through the power of Generative AI and Spatial Intelligence.

## ✨ Key Features

### 🎤 Voice AI Assistant
- **Push-to-talk & Continuous Mode**: Natural conversations with the stadium's central AI.
- **Multimodal**: Integrated Speech-to-Text (STT) and Text-to-Speech (TTS).
- **Interactive UI**: Real-time voice waveform and AI "thinking" animations.
- **Commands**: Navigation to gates, finding amenities, emergency assistance, and live translations.

### 🤖 Multi-Agent AI Ecosystem
Specialized agents working in harmony:
- **Navigation AI**: Real-time route optimization and pedestrian flow.
- **Crowd Intelligence**: Predictive density monitoring and bottleneck prevention.
- **Emergency & Medical AI**: Rapid incident response and resource dispatching.
- **Sustainability AI**: Energy optimization and waste management analytics.

### 🏟 Digital Twin (Spatial Intelligence)
- **Interactive 3D Simulation**: Real-time heatmap overlays of stadium zones.
- **Sensor Integration**: Live monitoring of temperature, wind, and occupancy levels.
- **Operational HUD**: AI-driven overlays for real-time decision support.

### 📊 Command Center (Organizer Dashboard)
- **Live Metrics**: Real-time attendance and incident tracking.
- **Predictive Analytics**: AI-estimated crowd flows for the next 30-60 minutes.
- **Resource Management**: Staff deployment and deployment optimization.

### ♿ Accessibility & Inclusion
- **WCAG AA Compliant**: High contrast, screen reader support, and keyboard navigation.
- **Multilingual Support**: Live translation in 24+ languages.
- **Wheelchair Navigation**: AI-optimized accessible routes.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS, Framer Motion, GSAP
- **3D/Graphics**: Three.js, React Three Fiber
- **AI/ML**: Google Gemini Pro API
- **Database/Auth**: Firebase Firestore & Authentication
- **Maps**: Google Maps & Mapbox (Integration ready)
- **Speech**: Web Speech API

## 📁 Project Structure
```text
src/
├── app/                  # Next.js App Router (Pages: Home, About, Dashboard, etc.)
├── components/           # Reusable UI Components
│   ├── ui/               # Atomic design components (Navbar, Hero, etc.)
│   ├── agents/           # AI Agent specific components
│   ├── digital-twin/     # 3D and Simulation components
│   ├── voice/            # Voice Assistant UI & Logic
│   └── dashboard/        # Command Center modules
├── services/             # API & Firebase Integrations
├── hooks/                # Custom React hooks
├── utils/                # Helper functions
└── types/                # TypeScript interfaces
```

## 🏗 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krishna-patil-rajput/ArenaMindAI.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (`.env.local`):
   ```text
   NEXT_PUBLIC_GEMINI_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   ...
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 👨‍💻 Developer
**Krishna Patil Rajput**
*AI Engineer | Full-Stack Developer | Android Developer | Game Developer*

Created with passion for **Virtual PromptWars Challenge 4**.

---
*Note: This project is a concept for educational and competition purposes. It has no official affiliation with FIFA or any stadium management body.*
