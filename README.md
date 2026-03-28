# Proofly AI - Trust Intelligence Engine 🚀

![Proofly AI Banner](https://img.shields.io/badge/Proofly%20AI-Trust%20Intelligence-0ea5e9?style=for-the-badge&logo=shield)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.3-green?style=flat-square&logo=mongodb)
![MiniMax](https://img.shields.io/badge/MiniMax-2.7B-purple?style=flat-square&logo=robot)

> A production-ready, full-stack AI-powered web application that analyzes and verifies the authenticity of content (emails, links, images, videos) using MiniMax-2.7 API as the core AI engine.

## ✨ Features

### 🔍 Content Analysis
- **📩 Email Scam Detector** - Analyze emails for phishing attempts and fraudulent content
- **🔗 Link Safety Analyzer** - Verify URL authenticity and detect malicious links
- **🖼️ Image Authenticity Analyzer** - Detect AI-generated images and manipulation
- **🎥 Video Deepfake Analyzer** - Identify synthetic videos and deepfakes

### 🤖 AI-Powered Detection
- **AI vs Real Detection** - Determines if content is AI-generated or authentic
- **Trust Score System** - Comprehensive 0-100 scoring with risk levels
- **Probability Scoring** - AI generation probability percentages
- **Detailed Indicators** - Specific markers explaining the detection

### 🌐 Internet Research Layer
- **Simulated Web Research** - Similar cases identification
- **Credibility Assessment** - Source verification
- **User Reports** - Community feedback integration
- **Sentiment Analysis** - Overall content sentiment

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (optional for history storage)
- MiniMax API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/tanmay-joshi-official/proofly-ai.git
cd proofly-ai

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Client runs on http://localhost:3000
```

**Open Browser:**
Navigate to `http://localhost:3000`

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) + JavaScript |
| Styling | Tailwind CSS + Framer Motion |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI Engine | MiniMax-2.7 API |
| Icons | Lucide React |

## 📁 Project Structure

```
proofly-ai/
├── client/                          # Next.js Frontend
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── email/             # Email analyzer
│   │   │   ├── link/              # Link analyzer
│   │   │   ├── image/             # Image analyzer (AI detection)
│   │   │   ├── video/             # Video analyzer (Deepfake detection)
│   │   │   ├── layout.jsx         # Root layout
│   │   │   ├── page.jsx           # Dashboard
│   │   │   └── globals.css        # Global styles
│   │   └── components/            # React components
│   │       ├── Sidebar.jsx        # Navigation sidebar
│   │       ├── TrustScore.jsx     # Trust score display
│   │       ├── RiskBadge.jsx      # Risk level badge
│   │       ├── AnalysisResult.jsx # Results display
│   │       ├── AIDetectionBadge.jsx # AI detection badge
│   │       ├── ConfidenceMeter.jsx   # Probability meters
│   │       ├── LoadingSkeleton.jsx   # Loading states
│   │       ├── AnalyzerForm.jsx      # Input forms
│   │       ├── ScrollToTop.jsx       # Scroll button
│   │       └── ClientLayout.jsx      # Client wrapper
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── jsconfig.json
│   └── next.config.js
│
├── server/                          # Express Backend
│   ├── routes/                     # API routes
│   │   ├── emailRoutes.js         # Email analysis endpoint
│   │   ├── linkRoutes.js          # Link analysis endpoint
│   │   ├── imageRoutes.js         # Image analysis + AI detection
│   │   └── videoRoutes.js         # Video analysis + deepfake detection
│   ├── models/
│   │   └── Analysis.js            # MongoDB schema
│   ├── utils/
│   │   └── minimax.js             # MiniMax API integration
│   ├── index.js                    # Server entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

## 📊 Trust Score System

| Score Range | Risk Level | Color | Action |
|-------------|------------|-------|--------|
| 70-100 | 🟢 Low Risk | Green | Safe to engage |
| 40-69 | 🟡 Medium Risk | Yellow | Verify independently |
| 0-39 | 🔴 High Risk | Red | Do not engage |

## 🤖 AI Detection Methodology

### Image Analysis
The system detects AI-generated images through:
- **Visual Pattern Analysis** - Perfect symmetry, unnatural smoothness
- **Metadata Check** - EXIF data verification
- **Noise Pattern Analysis** - Camera sensor patterns
- **Lighting Consistency** - Shadow and reflection analysis

### Video Deepfake Detection
Detects synthetic videos through:
- **Facial Landmark Analysis** - Face boundary distortions
- **Audio-Visual Sync** - Synchronization issues
- **Eye Movement Patterns** - Unnatural blinking/movement
- **Voice Synthesis Detection** - Robotic undertone analysis

## 🎨 UI Features

- **Modern SaaS Design** - Clean, professional interface
- **Dark/Light Mode** - Persistent theme with toggle
- **Responsive Layout** - Desktop, tablet, mobile support
- **Animated Trust Score** - Circular progress with 0-100 display
- **Color-Coded Risk Badges** - Green/Yellow/Red indicators
- **Smooth Animations** - Framer Motion transitions
- **Loading Skeletons** - Professional loading states
- **Scroll-to-Top Button** - Easy navigation
- **Sidebar Navigation** - Intuitive routing
- **AI Detection Banners** - Prominent AI vs Real display
- **Confidence Meters** - Animated probability bars

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| Desktop | Full sidebar navigation |
| Tablet | Collapsible sidebar |
| Mobile | Hamburger menu with overlay |

## 🐛 Troubleshooting

### "Cannot connect to API"
- ✅ Check if backend server is running
- ✅ Verify API key in `.env`
- ✅ Check CORS configuration

### "MongoDB connection failed"
- MongoDB is optional - app works without it
- Install MongoDB locally or use MongoDB Atlas

### "npm install failed"
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📈 Future Enhancements

- [ ] Real-time file upload for images/videos
- [ ] Batch analysis capability
- [ ] User authentication and history
- [ ] Export reports as PDF
- [ ] API rate limiting
- [ ] Email notifications
- [ ] Browser extension
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check MiniMax API documentation
- Review Next.js documentation

---

**Built with ❤️ By Tanmay Joshi**

**Version:** 1.0.0  
**Last Updated:** 2026-03-28

[![Star on GitHub](https://img.shields.io/github/stars/tanmay-joshi-official/proofly-ai?style=social)](https://github.com/tanmay-joshi-official/proofly-ai)
[![Follow on GitHub](https://img.shields.io/github/followers/tanmay-joshi-official?style=social)](https://github.com/tanmay-joshi-official)
