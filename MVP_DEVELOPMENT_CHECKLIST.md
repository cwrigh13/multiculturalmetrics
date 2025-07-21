# MVP Development Checklist: Multicultural Metrics Dashboard

**Document Version:** 1.0  
**Date:** Created from PRD.md requirements  
**Purpose:** Complete task checklist for building the MVP web application

## Overview
This checklist contains all tasks required to build the Multicultural Metrics Dashboard to MVP stage based on the Product Requirements Document. Tasks are organized by priority and functional area.

---

## **Phase 1: Foundation & Setup**

### Project Configuration
- [ ] **Project Setup**: Install Google Fonts (Work Sans), ensure Tailwind CSS is properly configured, and verify React hooks setup
- [ ] **Color Scheme**: Define color scheme variables (colors.lightCyan, colors.teal, colors.veryLightCyan, colors.lightBlueGreen, colors.darkTeal) for consistent styling
- [ ] **SVG Icons**: Create SVG icons for tick icons (successful benchmarks) and question mark icons where needed

### Data Architecture
- [ ] **Data Structure**: Create hardcoded data structure with `programData` array (community, suburb, program type, attendance, date) and `slnswBenchmarks` array (quantitative/qualitative benchmarks)
- [ ] **Suggestions Map**: Create `suggestionsMap` object with specific SLNSW 2017 report recommendations for each benchmark type
- [ ] **State Management**: Set up React state management with useState hooks for filter selections, filtered data, AI responses, and loading states

---

## **Phase 2: Core Layout & Navigation**

### Header & Branding
- [ ] **Header Section**: Add Georges River Council logo (centered) and main title 'Georges River Libraries: Multicultural Metrics Dashboard' with H1 styling and bottom border

### Filter System
- [ ] **Filter Buttons**: Create community filter buttons (All, Chinese, Spanish, Greek, Nepali, Arabic), suburb buttons (All, Hurstville, Kogarah, Penshurst, South Hurstville, Oatley), and time period buttons (YTD, 12 months, 2 years, 5 years, 10 years)
- [ ] **Conditional Filtering**: Add conditional display logic to hide 'South Hurstville' and 'Oatley' suburb buttons when 'Chinese' community is selected
- [ ] **Filtering Logic**: Implement data filtering functions to filter programData based on selected community, suburb, and time period, updating all relevant sections

---

## **Phase 3: Dashboard Content**

### Summary Statistics
- [ ] **Summary Boxes**: Create 4 prominent boxes showing Total CALD Program Attendees, New CALD Members, Multilingual Collection Loans, and Staff Cultural Training Completion with proper styling (lightCyan background, teal text)

### Program Engagement
- [ ] **Program Charts**: Build Program Engagement section with bar charts using styled divs for Top Program Types by Attendance and Top Communities Engaged (top 5 each, teal bars on veryLightCyan background)

---

## **Phase 4: SLNSW Benchmarks**

### Quantitative Benchmarks
- [ ] **ESL Collection**: Create Planning for library services relevant to CALD clients display with actual vs target values, progress bars, and status indicators
- [ ] **LOTE Collection**: Implement LOTE Collection Provision displays with main benchmark and sub-items
- [ ] **LOTE Sub-items**: Build LOTE Collection sub-items (Minimum Items, Proportion for Large LGAs, Existence for Significant Groups) with tooltips and success indicators
- [ ] **Specialist Staffing**: Add Organisational capacity to develop and deliver multicultural services/collections benchmark with progress bars and actual vs target displays
- [ ] **Research Frequency**: Add Formal Audience Research Frequency benchmark with progress bars and actual vs target displays
- [ ] **Progress Indicators**: Create reusable progress bars and gauges showing benchmark progress with color-coded status (On Track/Needs Attention/Off Track)
- [ ] **Tooltips**: Add hover tooltips explaining minimum items, LGA proportions, and significant groups requirements

### Qualitative Benchmarks
- [ ] **Qualitative Section**: Create Qualitative Benchmarks section displaying Feedback Mechanisms and Staff Cultural Competency Training with status indicators and justification text

---

## **Phase 5: Health & Improvements**

### Benchmark Health
- [ ] **Health Summary**: Build Benchmark Health summary showing count of 'On Track' benchmarks, full-width progress bar with color coding, and overall health status message
- [ ] **Improvement Suggestions**: Implement improvement suggestions section listing benchmarks with 'Needs Attention' or 'Off Track' status and display specific recommendations from SLNSW 2017 report

---

## **Phase 6: AI Integration**

### AI Query Feature
- [ ] **AI Interface**: Create AI query section with input field, 'Ask AI' button, loading indicator ('Thinking...'), and response display area
- [ ] **AI API Setup**: Configure Google Gemini API (gemini-2.0-flash) with fetch call, context passing (filtered programData and slnswBenchmarks), and error handling

---

## **Phase 7: Polish & Responsive Design**

### Styling & UX
- [ ] **Styling Polish**: Apply final styling ensuring Work Sans font is loaded, proper spacing, borders, and color scheme throughout the application
- [ ] **Responsive Design**: Implement responsive layout ensuring dashboard works on mobile, tablet, and desktop with proper Tailwind CSS responsive classes

### Testing & Validation
- [ ] **Testing & Validation**: Verify all filtering works correctly, AI integration functions, data displays accurately, and responsive design works across devices

---

## **Technical Requirements Summary**

### Dependencies Required:
- React (functional components with hooks)
- Tailwind CSS
- Google Fonts (Work Sans)
- Google Gemini API access (gemini-2.0-flash)

### Key Data Structures Needed:
- `programData`: Array of CALD program records
- `slnswBenchmarks`: Array of benchmark data
- `suggestionsMap`: Object with improvement recommendations
- State variables for filters and AI responses

### API Integration:
- Google Gemini API endpoint
- Context passing with filtered data
- Error handling and loading states

### Styling Guidelines:
- **Colors**: lightCyan backgrounds, teal text/bars, color-coded status indicators
- **Typography**: Work Sans font family
- **Layout**: Responsive grid system, centered logo, bottom borders
- **Components**: Custom progress bars, styled filter buttons, hover tooltips

---

## **Definition of Done for MVP**
- [ ] All filtering mechanisms work correctly and update data display
- [ ] All SLNSW benchmarks display with proper progress indicators
- [ ] AI query feature responds with relevant answers
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Hardcoded data displays accurately across all sections
- [ ] Color scheme and typography match specifications
- [ ] All tooltips and interactive elements function properly

**Total Tasks: 24** 