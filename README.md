# Smart Guest Parking Reservation – IZIX Case Study

This project is a **product design + front-end prototype** exploring how companies can ensure parking availability for external guests during corporate events, **despite uncertainty about who will come by car and without collecting personal data**.

The solution aligns with IZIX’s vision around **smart parking, AI-driven decision-making, and modern UX**, while remaining realistic to implement.

---

## ✨ Concept Overview

When companies host events (board meetings, trainings, conferences…), they often:
- Don’t know exactly **who will need parking**
- Don’t have access to **personal data** (license plates, attendees list)
- Risk either **over-reserving** or **under-reserving** guest parking

This prototype introduces a **Smart Guest Pool**:
- An AI-assisted estimation of how many parking spots should be reserved
- Based on contextual signals rather than personal data
- With clear strategies and transparent decision-making

---

## 🧠 Key Features

### 1. Event Configuration (Step 1)
Users define the event context:
- Event name & type
- Date and time slot
- Estimated number of guests
- Parking location selection

This step intentionally avoids collecting any personal information.

---

### 2. AI Compute Pipeline (Step 2)
A simulated AI pipeline runs in real time, showing transparency and confidence:

**Signals used**
- Weather forecast (location + date)
- Public & school holidays (Belgium)
- Parking historical occupancy patterns
- Similar past events behavior

Each step is visualized with:
- Animated progress bar
- Dedicated Lottie animations per task
- Clear status messages

> The goal is to make the user feel that the system *understands the problem*, not just calculates numbers.

---

### 3. Strategy Selection (Step 3)
Once the AI result is ready, the user chooses a **reservation strategy**:

| Strategy | Behavior | Risk |
|--------|---------|------|
| Safe | Over-reserve spots | Very low |
| Balanced (AI recommended) | Optimal trade-off | Low |
| Aggressive | Minimal reservation | Higher |

Each strategy clearly shows:
- Estimated number of reserved spots
- Impact on parking occupancy
- Risk level

---

### 4. Summary & Confirmation (Step 4)
Final confirmation step with:
- Event recap
- Selected strategy
- Estimated guest parking usage
- Success animation (event created)

User can:
- Return to dashboard
- Create another event

---

## 🧩 UX & Design Principles

- **Transparency over magic**  
  The AI does not behave like a black box. Users see *what is analyzed* and *why* a decision is made.

- **Progressive disclosure**  
  Advanced information is revealed only when relevant.

- **Offline-first thinking**  
  No dependency on live user tracking or personal data.

- **Mobile-first adaptability**  
  Responsive layout with:
  - Desktop side panel stepper
  - Mobile bottom step navigation

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Material UI (MUI v7 – Grid v2)**
- **Lottie animations**
- **Local mock APIs (no backend required)**

---

## 📁 Project Structure

src/
├─ app/
│ ├─ page.tsx # Dashboard (home)
│ └─ reserve-event/
│ ├─ page.tsx
│ ├─ api/
│ │ ├─ weather/
│ │ ├─ holidays/
│ │ ├─ parking-history/
│ │ └─ api-recommendation/
│ ├─ _lib/
│ │ ├─ types.ts
│ │ ├─ parkingCatalog.ts
│ ├─ components/
│ │ └─ ReserveEventWizard.tsx
│ └─ steps/
│ ├─ EventInfoStep.tsx
│ ├─ ComputeStep.tsx
│ ├─ StrategyStep.tsx
│ └─ SummaryStep.tsx
├─ shared/
│ ├─ ui/
│ └─ hooks/
public/
└─ lottie/
├─ weather.json
├─ holidays.json
├─ parking.json
├─ ai.json
└─ event-created.json


---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
```bash
npm install
# or
yarn install

Run the project
npm run dev
# or
yarn dev
```

---

The application will be available at:

http://localhost:3000

---

## 🧪 Data & AI Disclaimer

- All AI computations are **mocked locally**
- No external AI service is used
- All data sources (weather, parking, holidays) are simulated
- The goal is to demonstrate **product thinking and UX**, not ML performance

---

## 🧠 Why This Approach

- Avoids privacy issues (no license plates, no personal data)
- Scales easily across different companies and parking sites
- Aligns with IZIX’s **IoT & AI positioning**

This approach can later integrate:
- Real occupancy sensors
- Live parking availability
- Smart guidance & indoor navigation

---

## 🔮 Possible Extensions

- Real-time occupancy sync with IoT sensors
- Smart guest navigation (pre-parking + indoor guidance)
- Automatic guest communication (email / QR access)
- Multi-parking strategy optimization
- Historical learning loop across events

---

## 🎯 Purpose of This Project

This case study is **not meant to be production-ready**.

It is designed to demonstrate:
- Product reasoning
- UX clarity
- Technical execution
- Ability to bridge design, frontend, and business constraints

---

## 👋 Author

Built as part of an **IZIX Front-End / Product Design case study**.
