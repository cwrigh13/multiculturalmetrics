# Product Requirements Document: Multicultural Metrics Dashboard

**Document Version:** 1.0  
**Date:** July 19, 2025  
**Product Owner:** [Librarian's Name/Role]  
**Development Team:** Gemini AI

## 1. Introduction

### 1.1 Purpose
This Product Requirements Document (PRD) outlines the specifications for the "Multicultural Metrics Dashboard" web application. The primary purpose of this application is to provide Georges River Libraries with an effective and efficient tool to measure and evaluate the delivery of its targeted library services to Culturally and Linguistically Diverse (CALD) communities against established State Library of NSW (SLNSW) benchmarks. This directly supports the key performance indicator (KPI) of "Evaluating the delivery of targeted services to culturally and linguistically diverse communities to ensure progress against agreed benchmarks."

### 1.2 Vision
To empower Georges River Libraries staff and stakeholders with a clear, interactive, and data-driven overview of multicultural service performance, facilitating informed decision-making and continuous improvement in fostering an inclusive and responsive library environment for all CALD communities.

### 1.3 Scope

**In-Scope for Version 1.0:**
- Interactive web-based dashboard.
- Display of key summary statistics related to CALD program engagement.
- Filtering capabilities by community, suburb, and time period.
- Visualisation of quantitative SLNSW benchmarks with progress indicators.
- Display of qualitative SLNSW benchmarks with status and justification.
- An "Overall Benchmark Health" summary with improvement suggestions derived from the SLNSW 2017 report.
- An "Ask the AI" feature for natural language querying of the displayed data and benchmarks.
- Hardcoded data for prototype demonstration.
- Responsive design for various screen sizes.

**Out-of-Scope for Version 1.0 (Future Enhancements):**
- Direct integration with live library management systems (LMS) or Google Sheets APIs for dynamic data fetching.
- User authentication and role-based access control.
- Data input/editing functionalities within the app.
- Advanced charting libraries (e.g., D3.js, Recharts) beyond basic bar charts and progress indicators.
- Comprehensive reporting export formats (beyond screenshot/print).
- Historical data storage and trend analysis beyond what's hardcoded.

## 2. Goals & Objectives

### 2.1 Business Goals (Aligned with Librarian's KPI)
- **Streamline Evaluation:** Reduce manual effort in collecting and presenting data for CALD service evaluation.
- **Enhance Transparency:** Provide a clear and accessible overview of multicultural service performance to internal and external stakeholders.
- **Drive Improvement:** Identify areas where CALD services are excelling or falling short, and provide actionable suggestions for improvement based on best practices.
- **Support Strategic Planning:** Offer data-driven insights to inform future planning and resource allocation for multicultural services.

### 2.2 Product Objectives
- Achieve 100% accurate display of hardcoded program data and SLNSW benchmarks.
- Ensure all filtering mechanisms (community, suburb, time) function correctly and update relevant sections.
- Provide intuitive visual indicators for benchmark status (On Track, Needs Attention, Off Track).
- Successfully integrate the AI query feature, providing relevant responses based on the provided data context.
- Deliver a user-friendly and aesthetically pleasing interface adhering to the specified brand guidelines.

## 3. User Personas / Audience

### 3.1 Primary User: CALD Services Librarian (e.g., Georges River Libraries)
- **Needs:** Quick access to performance data, ability to filter by specific communities/locations, clear visualisation of progress against benchmarks, actionable insights for reporting and planning, and a tool to easily query data.
- **Pain Points:** Manual data compilation, difficulty in identifying trends, time-consuming report generation, lack of immediate suggestions for improvement.

### 3.2 Secondary Users: Library Management, Council Stakeholders
- **Needs:** High-level overview of service performance, clear understanding of benchmark status, justification for resource allocation, and identification of areas requiring strategic focus.
- **Pain Points:** Lack of consolidated data, difficulty in understanding the impact of multicultural services.

## 4. Features & Functionality (Detailed)

### 4.1 Dashboard Overview

**Logo & Title:**
- Display the Georges River Council logo at the top, centered.
- Display the main title: "Georges River Libraries: Multicultural Metrics Dashboard" (H1, bold, centered, with a bottom border).

**Filtering:**
- **Community Filter Buttons:** A row of clickable buttons for specific CALD communities: "All", "Chinese", "Spanish", "Greek", "Nepali", "Arabic".
- **Conditional Display:** When "Chinese" is selected, the "South Hurstville" and "Oatley" suburb buttons should not be displayed.
- **Suburb Filter Buttons:** A row of clickable buttons for specific Georges River suburbs: "All", "Hurstville", "Kogarah", "Penshurst", "South Hurstville", "Oatley".
- **Time Period Filter Buttons:** A row of clickable buttons for time ranges: "YTD", "12 months", "2 years", "5 years", "10 years".
- **Interaction:** Clicking a filter button updates the displayed data in the Summary Grid and Program Engagement charts.

**Summary Boxes:**
A grid of four prominent boxes displaying key aggregated metrics:
- Total CALD Program Attendees (filtered by selected period & community/suburb).
- New CALD Members (filtered by selected period & community/suburb).
- Multilingual Collection Loans (Avg. Monthly - currently hardcoded, but conceptually filtered).
- Staff Cultural Training Completion (Overall - currently hardcoded).

Each box includes a large value, a descriptive label, and the relevant period.
Background: colors.lightCyan. Value text: colors.teal.

### 4.2 Program Engagement Section

**Title:** "Program Engagement" (H2).

**Top Program Types by Attendance:**
- A bar chart (visual representation using styled divs) showing the top 5 program types by attendance.
- Bar color: colors.teal. Background: colors.veryLightCyan.

**Top Communities Engaged:**
- A bar chart (visual representation using styled divs) showing the top 5 communities by attendance.
- Bar color: colors.teal. Background: colors.veryLightCyan.

### 4.3 SLNSW Benchmarks Section

**Title:** "Progress Against SLNSW Benchmarks" (H2).

**Quantitative Benchmarks Sub-section:**
- **Title:** "Quantitative Benchmarks" (H3).

**Planning for library services relevant to CALD clients (Grouped Benchmark):**
- Main label: "Planning for library services relevant to CALD clients (Collections)".
- Sub-item: "ESL collection established where CALD population >1% LGA population."
- Displays actual vs. target (e.g., "42% / 1%").
- Progress bar/gauge.
- Status indicator (On Track/Needs Attention/Off Track).
- Justification text.

**LOTE Collection Provision (Grouped Benchmark):**
- Main label: "LOTE Collection Provision (Collections)".
- **Sub-item 1:** "Minimum Items."
  - Displays actual vs. target (e.g., "15,454 / 100").
  - Progress bar/gauge.
  - Success Indicator: A green tick icon next to the label if the actual meets/exceeds the target.
  - Tooltip: On hover, displays "A LOTE collection should have at least 100 items."
- **Sub-item 2:** "Proportion for Large LGAs."
  - Displays actual vs. target (e.g., "1.5% / 2%").
  - Progress bar/gauge.
  - Tooltip: On hover, displays "For large LGAs (population >100,000), a collection exists for a language when it is at least 2% of the resident population speaking that language."
- **Sub-item 3:** "Existence for Significant Groups."
  - Displays actual vs. target (e.g., "1 / 1").
  - Progress bar/gauge.
  - Tooltip: On hover, displays "A collection should exist for a particular language group where more than 1000 residents speak that language."

**Organisational capacity to develop and deliver multicultural services/collections:**
- Displays actual vs. target (e.g., "0.5 FTE / 2 FTE").
- Progress bar/gauge.

**Formal Audience Research Frequency:**
- Displays actual vs. target (e.g., "0.25 biennial / 0.5 biennial").
- Progress bar/gauge.

**Qualitative Benchmarks Sub-section:**
- **Title:** "Qualitative Benchmarks" (H3).
- Displays two specific qualitative benchmarks (Feedback Mechanisms, Staff Cultural Competency Training).
- Each benchmark includes:
  - Description of the benchmark.
  - Status indicator (On Track/Needs Attention/Off Track) with corresponding color (lightBlueGreen, teal, darkTeal).
  - Justification text.

### 4.4 Benchmark Health & Improvement Suggestions

**Title:** "Benchmark Health & Improvement Suggestions" (H2).

**Overall Benchmark Health:**
- Displays the count of 'On Track' benchmarks out of the total.
- A full-width progress bar showing the percentage of 'On Track' benchmarks, color-coded based on overall health (lightBlueGreen, teal, darkTeal).
- A concise message summarising the overall health status.

**Suggestions to Improve Scores:**
- Lists benchmarks currently in 'Needs Attention' or 'Off Track' status.
- For each, displays its status, type, qualitative description, current justification, and a bulleted list of specific recommendations from the SLNSW 2017 report (suggestionsMap).

### 4.5 Ask the AI about the Data Section

**Title:** "Ask the AI about the Data" (H2).
- **Input Field:** A text input field for users to type questions.
- **"Ask AI" Button:** Triggers the AI query.
- **Loading Indicator:** Displays "Thinking..." while the AI processes the request.
- **AI Response Display:** Shows the AI's answer, or an error message if the request fails.
- **Context:** The AI will receive the hardcoded programData (filtered by current selections) and slnswBenchmarks as context for its responses.

## 5. User Stories (Examples)

- As a Librarian, I want to see a quick summary of CALD program attendees and new members so I can report on engagement at a glance.
- As a Librarian, I want to filter data by specific CALD communities and suburbs so I can understand performance in targeted areas.
- As a Librarian, I want to see if our LOTE collection meets minimum item counts and population proportion benchmarks so I can identify collection gaps.
- As a Librarian, I want to know if our staff cultural competency training is sufficient against SLNSW benchmarks so I can plan professional development.
- As a Manager, I want to see an overall health score for our multicultural services so I can quickly assess our performance.
- As a Librarian, I want actionable suggestions from the SLNSW report for benchmarks that are 'Off Track' so I can plan improvements.
- As a Librarian, I want to ask the AI questions like "Which program type is most popular with Arabic speakers?" and get answers based on the dashboard data.

## 6. Technical Requirements

### 6.1 Frontend
- **Framework:** React (functional components, hooks).
- **Styling:** Tailwind CSS.
- **Font:** Work Sans (imported from Google Fonts).
- **Icons:** SVG icons for tick/question mark.
- **Responsiveness:** Fully adaptive layout for mobile, tablet, and desktop.
- **No External Charting Libraries (for V1):** Visualisations will be rendered using basic HTML/CSS/React components.

### 6.2 Backend
- **None for Data Storage/Retrieval (V1 Prototype):** All data is hardcoded within the React component.
- **AI API Call:** Direct fetch call to the Google Gemini API (gemini-2.0-flash model).

### 6.3 Data Source
- **Current (V1 Prototype):** Hardcoded JavaScript arrays (programData, slnswBenchmarks).
- **Future:** Google Sheets API, or a simple JSON API endpoint.

### 6.4 AI Integration
- **Model:** gemini-2.0-flash.
- **API Key:** Placeholder const apiKey = ""; (requires user to provide their own).
- **Context:** The AI will receive stringified filteredProgramData and slnswBenchmarks as context.
- **Functionality:** Takes natural language questions, provides text-based answers.

### 6.5 Hosting/Deployment
- Designed as a single-file React app suitable for embedding in environments like Google Canvas.

## 7. Key Performance Indicators (KPIs) & Success Metrics for the App Itself

- **User Engagement:** (Qualitative) Feedback from librarians on the app's usefulness and ease of use.
- **Data Accuracy:** (Qualitative) Verification by librarians that the hardcoded data and calculations accurately reflect their understanding.
- **AI Responsiveness:** (Quantitative) Average time taken for AI to respond to queries.
- **AI Relevance:** (Qualitative) Librarian satisfaction with the accuracy and helpfulness of AI-generated answers.
- **Feature Adoption:** (Qualitative) Extent to which filtering and AI features are used by librarians.

## 8. Future Enhancements (Roadmap)

- **Dynamic Data Integration:** Connect to Google Sheets API or a dedicated database (e.g., Firestore) for real-time data updates.
- **Data Input/Management:** Allow librarians to input and edit program and benchmark data directly within the app.
- **Advanced Charting:** Integrate a charting library (e.g., Recharts, Chart.js) for more sophisticated and interactive data visualisations.
- **Customizable Benchmarks:** Allow librarians to define and manage their own quantitative and qualitative benchmarks within the app.
- **Reporting Features:** Add functionality to generate and export structured reports (e.g., PDF, CSV) of the dashboard data and insights.
- **User Accounts & Permissions:** Implement user authentication for secure access and differentiated views.
- **Notifications:** Alert librarians when benchmarks are 'Off Track' or 'Needs Attention'.
- **Local History Collection Tracking:** Expand data collection and benchmarks for local migrant history initiatives.
- **Multilingual Interface for App:** Allow the dashboard interface itself to be viewed in multiple languages. 