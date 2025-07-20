# Georges River Libraries: Multicultural Metrics Dashboard

A dynamic web application designed to help Georges River Libraries monitor and analyse their engagement with culturally and linguistically diverse (CALD) communities.

## 🎯 Purpose

This dashboard provides insights into:
- Program attendance and engagement
- New member acquisition through multicultural programs
- Performance against State Library of New South Wales (SLNSW) benchmarks
- Clear picture of multicultural service delivery

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`

## 📊 Key Features

### 1. Program Filtering
- **Community Filter**: Filter by specific target communities (Arabic, Chinese, Mandarin, Spanish, etc.)
- **Suburb Filter**: Filter by program location (Hurstville, Kogarah, etc.)
- **Time Period Filter**: View data across different timeframes (YTD, 12 months, 2 years, etc.)
- **Conditional Logic**: Automatic filtering (e.g., Chinese community hides certain suburbs)

### 2. Program Summaries
- Total Programs count
- Total Attendance figures
- New Members acquired
- Unique Communities served
- Calculated metrics (average attendance, conversion rates)

### 3. Program Engagement Charts
- Interactive bar charts showing attendance by:
  - Program Type (ESL Class, Digital Literacy, Cultural Events, etc.)
  - Target Community
- Built with Chart.js for responsive visualization

### 4. SLNSW Benchmarks
- **Quantitative Benchmarks**: Measurable targets with progress bars
- **Qualitative Benchmarks**: Descriptive assessments with status indicators
- Visual status indicators (On Track, Needs Attention, Off Track)
- Tooltips and detailed justifications

### 5. Benchmark Health Summary
- Overall performance percentage
- Health status messages
- Specific improvement recommendations
- Action items and priority focus areas

### 6. Ask the AI
- Interactive AI-powered Q&A interface
- Context-aware responses based on current data
- Sample questions for guidance
- Simulated AI responses (ready for Gemini API integration)

## 🛠️ Technical Details

### Built With
- **React** - Frontend framework using functional components and hooks
- **Tailwind CSS** - Utility-first styling framework
- **Chart.js & React-ChartJS-2** - Data visualization
- **Vite** - Build tool and development server

### Project Structure
```
src/
├── components/
│   ├── AskAI.jsx              # AI Q&A interface
│   ├── BenchmarkHealth.jsx    # Health summary & recommendations
│   ├── ProgramCharts.jsx      # Data visualization charts
│   ├── ProgramFilters.jsx     # Interactive filtering controls
│   ├── ProgramSummaries.jsx   # Key metrics display
│   └── SLNSWBenchmarks.jsx    # Benchmark performance display
├── data.js                    # Hardcoded sample data
├── App.jsx                    # Main application component
├── index.css                  # Tailwind CSS imports
└── main.jsx                   # Application entry point
```

### Data Structure
The application uses hardcoded sample data including:
- Program records with attendance, communities, dates, locations
- SLNSW benchmark targets and performance metrics
- Community and suburb reference data
- Helper functions for data filtering and calculations

## 🎨 Design Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interactive elements

### User Experience
- Intuitive filtering with visual feedback
- Clear status indicators and progress bars
- Contextual help and tooltips
- Loading states and error handling

### Accessibility
- Semantic HTML structure
- ARIA labels and descriptions
- Color contrast compliance
- Keyboard navigation support

## 📱 Usage Guide

### Navigation
- Single-page application with scroll navigation
- All sections accessible from main dashboard

### Filtering Data
1. Use Community, Suburb, or Time Period buttons to filter
2. Observe real-time updates to summaries and charts
3. Note conditional filtering for specific communities
4. Check active filters summary at bottom of filter section

### Interpreting Benchmarks
- **Green indicators**: On Track performance
- **Yellow indicators**: Needs Attention
- **Red indicators**: Off Track, requires immediate focus
- Hover over tooltips for additional context

### Using Ask the AI
1. Type questions about dashboard data or library services
2. Use sample questions for guidance
3. Responses are contextualized to current filtered data
4. Currently simulated responses (ready for AI API integration)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Future Enhancements
- Real-time data integration
- Actual Gemini API integration for AI features
- Advanced filtering options
- Export functionality for reports
- User authentication and role-based access

## ⚠️ Important Notes

### Data Disclaimer
This dashboard uses **static, hardcoded data for demonstration purposes only**. It does not reflect real-time or live data from Georges River Libraries.

### Production Considerations
- Replace sample data with actual library management system integration
- Implement proper API security for AI features
- Add user authentication and access controls
- Include data privacy and security measures

## 📄 License

This project is for demonstration purposes. Please ensure compliance with relevant data protection and privacy regulations when implementing with real data.

## 🤝 Contributing

This is a demonstration project. For production implementation, consider:
- Code review processes
- Testing frameworks (Jest, React Testing Library)
- CI/CD pipelines
- Performance monitoring
- Error tracking and logging

---

**Built with ❤️ for Georges River Libraries**
