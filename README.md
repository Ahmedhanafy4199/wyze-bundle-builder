#  Frontend Take-Home — Bundle Builder

A fully interactive, responsive **React + Vite** prototype for a multi-step security system bundle builder. Shoppers configure their home security system step-by-step with a live review panel that updates in real time.

---

##  Run Instructions

**Requirements:** Node.js v20+ and npm.

```bash
# 1. Clone the repo
git clone https://github.com/Ahmedhanafy4199/wyze-bundle-builder.git
cd wyze-bundle-builder

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

```

---

##  Requirements Coverage

| Requirement | Status |
|---|---|
| 4-step accordion with Step 1 open by default | ✅ |
| Product cards with badge, image, description, Learn More | ✅ |
| Color/variant selector with independent per-variant quantities | ✅ |
| Quantity steppers synced between cards & review panel | ✅ |
| Live review panel grouped by Cameras / Sensors / Accessories / Plan | ✅ |
| "N selected" counter per accordion step | ✅ |
| Next step button advancing the accordion | ✅ |
| Checkout button with confirmation modal | ✅ |
| Save my system for later (localStorage persistence) | ✅ |
| Responsive down to mobile with bottom drawer | ✅ |
| Data-driven from JSON (no hardcoded product markup) | ✅ |
| Pre-populated base kit on load (sensors, accessory, plan) | ✅ |

---

##  Project Structure

```
src/
├── components/
│   ├── layout/               # Structural UI elements
│   │   ├── Header.jsx
│   │   ├── ReviewPanel.jsx   # Desktop sidebar + mobile drawer
│   │   ├── Modals.jsx        # Checkout & Learn More modals
│   │   ├── MobileSummaryBar.jsx
│   │   └── Toast.jsx
│   ├── builder/              # Accordion builder components
│   │   ├── StepHeader.jsx
│   │   ├── ProductCard.jsx
│   │   └── PlanCard.jsx
│   └── common/               # Reusable UI atoms
│       ├── Stepper.jsx
│       └── VariantChips.jsx
├── hooks/
│   └── useBuilder.js         # All state: quantities, variants, totals
├── data/
│   └── bundleData.json       # Single source of truth for all products
├── App.jsx                   # Main orchestrator (~200 lines)
└── index.css                 # Global styles & design tokens
```

---

## 🧩 Key Technical Decisions

### 1. Variant Quantity Tracking
Each variant is stored under its own key in the quantities map: `{ "wyze-cam-v4_white": 2, "wyze-cam-v4_black": 1 }`. This means switching color chips on a card never destroys counts — it just changes which variant's count the stepper shows. Every variant with a count > 0 gets its own line in the review panel, exactly as specified.

### 2. Base Kit vs. User Additions
The `bundleData.json` has a `baseKit` array that seeds the initial state (4x Entry Sensors, 1x Motion Sensor, 1x Keypad). These are marked `isBase: true` in the review panel and shown without steppers. If a user adds *more* of the same product, it appears as a separate, fully editable line. This keeps the UX clear about what's included vs. what they've added.

### 3. Custom `useBuilder` Hook
All state logic (quantities, variants, plan selection, totals calculation, localStorage persistence) lives in a single `useBuilder.js` hook. `App.jsx` is purely a view orchestrator — it maps over steps and renders components, with no business logic.

### 4. CSS Design System
A full custom token system in `:root` (colors, radii, shadows, transitions) drives the UI. No utility-class frameworks — all styles are authored class-by-class for full control over the premium aesthetic.

### 5. Data-Driven Rendering
All products, steps, and base-kit items come from `src/data/bundleData.json`. Adding a new product is a single JSON entry — no component changes needed.

---

## Tech Stack

- **React 18** + **Vite 5**
- **Lucide React** (icons)
- **Vanilla CSS** with custom design tokens
- **localStorage** for persistence
- **Google Fonts**: Outfit (display) + Inter (body)
