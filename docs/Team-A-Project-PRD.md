# Team A – Jutoverse Project Requirements Document (PRD)

## Project Overview

The Jutoverse platform is an AI-powered digital government assistance system designed to improve citizen service delivery through intelligent automation, explainable AI, multilingual communication, and operational transparency. The system assists service representatives with real-time decision support while ensuring compliance with accessibility, privacy, and government ICT standards.

---

# 1. Compliance Requirements

The platform adheres to the following operational requirements:

* Official Translation for Call Centers with low-latency speech-to-text and text-to-speech integration.
* Right-to-Left (RTL) formatting support.
* Hebrew interface compatibility.
* Web accessibility compliance.
* Personal data protection and privacy safeguards.
* Government ICT Authority (Yahav) information security recommendations.

---

# 2. Core Platform Feature Inventory

## 2.1 Overview Dashboard

### A. KPI Dashboard

**Components**

* Interactive Metric Cards
* KPI Dashboard
* System Statistics

**User Interaction**

Selecting a metric card filters the displayed statistics.

**Expected Behaviour**

* Active card highlights
* Dashboard statistics update dynamically

**Purpose**

Provides program managers with real-time operational metrics.

---

### B. AI Reasoning Panel

**Components**

* AI Reasoning Panel
* Confidence Score
* Decision Justification Log

**User Interaction**

Selecting an AI decision displays its reasoning.

**Expected Behaviour**

Displays:

* AI summary
* Confidence score
* Decision explanation
* Audit trail

**Purpose**

Improves explainability and operational transparency.

---

### C. Signal & Alert System

**Components**

* Alert Cards
* Live Signal Feed
* Warning Notifications

**User Interaction**

Hovering or selecting an alert.

**Expected Behaviour**

Displays:

* Alert metadata
* Warning parameters
* Context information

**Purpose**

Allows early detection of operational issues.

---

### D. System Status Banner

Displays overall platform health.

Examples:

* AI Monitoring Active
* System Online
* No Critical Alerts

---

### E. Responsive Window Layout

Dashboard panels automatically adapt to screen size while maintaining accessibility and usability.

---

# 2.2 Service Operations Dashboard

## AI Inspector Panel

Displays:

* AI recommendations
* Confidence score
* Decision rationale
* Supporting documents

The panel remains visible while scrolling.

---

## Interaction Feed

Selecting a service request automatically updates the AI Inspector Panel with the selected interaction.

---

## Operational Drill-Down Panels

Expandable investigation panels display:

* Historical interactions
* Analytics
* Processing records
* Review logs

---

## AI Reasoning Integration

Synchronizes explainability information across all operational views.

---

# 2.3 Representative Assistant AI Workspace

The Representative Assistant workspace contains the following modules:

1. Live Transcription Panel
2. Real-Time Translation Panel
3. AI Reasoning Panel
4. Intent Detection Panel
5. Conversational Workspace
6. Grounded Answer System
7. Evidence & Citation Panel
8. Translation Assist
9. Live Support Signals Panel

---

## Live Transcription Panel

Converts speech into text using the browser SpeechRecognition API and shares transcript data across the workspace.

---

## Real-Time Translation Panel

Provides multilingual translation using LibreTranslate.

Features include:

* Language selection
* Live translation
* AI Suggested Actions
* Confidence indicator

---

## AI Reasoning Panel

Generates contextual reasoning and explains AI-generated recommendations.

---

## Intent Detection Panel

Automatically categorizes citizen requests, including:

* Inquiry
* Complaint
* Application
* Information Request

---

## Conversational Workspace

Provides a chat interface between representatives and the AI assistant.

Includes:

* Suggested prompts
* Query composer
* Feedback controls

---

## Grounded Answer System

Displays:

* AI response
* Confidence score
* Supporting citations

---

## Evidence & Citation Panel

Provides verified references supporting AI responses for auditing purposes.

---

## Live Support Signals

Monitors:

* Citizen sentiment
* Translation risks
* Interaction severity

---

# 3. System Architecture

```text
Voice Input
      │
      ▼
Live Transcription Panel
      │
      ▼
liveTranscript State
      │
 ┌──────────────┬──────────────┬──────────────┐
 ▼              ▼              ▼
Translation   AI Reasoning   Intent Detection
Panel         Panel          Panel
      │
      ▼
Unified AI Assistant Workspace
      │
      ▼
Grounded Verification
      │
      ▼
Evidence & Citation Panel
```

---

# 4. Technical Stack

## Frontend

* React
* TypeScript
* Vite

## APIs

* Browser SpeechRecognition API
* Axios
* LibreTranslate

## Cloud Readiness

* AWS il-central-1 (Project Nimbus compatible)
* PII masking support
* Government cloud deployment readiness

---

# 5. Implementation Verification Checklist

| Feature                     | Status     |
| --------------------------- | ---------- |
| Speech-to-Text Integration  | ✅ Verified |
| Real-Time Translation API   | ✅ Verified |
| Shared Transcript State     | ✅ Verified |
| AI Reasoning Panel          | ✅ Verified |
| Intent Detection Panel      | ✅ Verified |
| Grounded Answer System      | ✅ Verified |
| Evidence & Citation Panel   | ✅ Verified |
| Live Support Signals        | ✅ Verified |
| Responsive Workspace Layout | ✅ Verified |
| Light Theme UI Improvements | ✅ Verified |
| Nimbus Approval Workflow    | ✅ Verified |
| Build Verification          | ✅ Verified |
| Git Integration             | ✅ Verified |

---

# Repository

GitHub Repository:

https://github.com/PShungube/Jutoverse-demo

---

# Team Deliverables

* AI-powered government assistance workspace
* Explainable AI decision support
* Real-time multilingual translation
* Live speech transcription
* Intent detection
* Grounded AI responses
* Responsive dashboard interfaces
* Government compliance alignment
* Git version control workflow
* Production-ready modular React architecture
