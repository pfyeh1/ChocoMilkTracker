# Chocolate Milk Tracker - Design Guidelines

## Design Approach

**Selected Framework:** Material Design principles with playful customization
**Rationale:** This is a utility-focused tracking application requiring clear data visualization, efficient logging workflows, and consistent component patterns. Material Design provides excellent foundations for form inputs, data tables, and chart integration while allowing personality through color and iconography.

**Key Design Principles:**
- Clarity over decoration: Information hierarchy drives every layout decision
- Delightful functionality: Fun personality without sacrificing usability
- Quick-add focused: Logging a drink should take 3 seconds or less
- Data at a glance: Dashboard prioritizes insights over raw numbers

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, and 24
- Micro spacing: 2-4 units (internal component padding, icon gaps)
- Standard spacing: 6-8 units (between form elements, card padding)
- Section spacing: 12-16 units (between dashboard sections, page margins)
- Major spacing: 24 units (top/bottom page padding)

**Grid Structure:**
- Dashboard: 12-column grid with 2-column sidebar (navigation/quick stats) + 10-column main content area on desktop
- Mobile: Single column stack, collapsible sidebar as drawer
- Cards: 4-column grid on desktop (2-2 split for stats), 1-column on mobile

## Typography

**Font Families:**
- Primary: Inter (Google Fonts) - body text, forms, data tables
- Display: Poppins (Google Fonts) - headings, large numbers, stats

**Hierarchy:**
- Page Headers: Poppins Bold, 32px/2rem (desktop), 24px/1.5rem (mobile)
- Section Headers: Poppins SemiBold, 24px/1.5rem (desktop), 20px/1.25rem (mobile)
- Card Titles: Inter SemiBold, 18px/1.125rem
- Body Text: Inter Regular, 16px/1rem
- Small Text/Labels: Inter Medium, 14px/0.875rem
- Large Stats: Poppins Bold, 48px/3rem (main dashboard numbers)

## Component Library

### Navigation & Layout
- **Sidebar Navigation:** Fixed left sidebar (desktop), bottom navigation bar (mobile)
  - Icon + label for each section: Dashboard, Log Drink, History, Stats
  - Active state with subtle background highlight
  - Icons from Heroicons (outline style)

### Dashboard Components
- **Stats Cards:** Elevated cards with subtle shadow, rounded corners (12px radius)
  - Large number display (Poppins Bold 48px) at top
  - Label beneath (Inter Medium 14px)
  - Small trend indicator (arrow icon + percentage)
  - 4-card grid: Total Drinks, This Week, Current Streak, Average/Day

- **Quick Add Widget:** Prominent floating action area
  - Large "Log Drink" button with glass icon
  - Size selector (pills: S/M/L/Custom)
  - Timestamp display showing "Now" with edit option
  - One-tap logging prioritized

- **Recent Activity Feed:** List view showing last 7-10 drinks
  - Each entry: Glass icon, size badge, timestamp, remove button
  - Grouped by day with date dividers
  - Scroll container with max-height

- **Chart Visualization:** Interactive line/bar chart
  - 7-day view by default, toggle to 30-day
  - Clear Y-axis labels (oz or drink count)
  - Subtle grid lines, no heavy borders
  - Use Chart.js or Recharts library

### Forms & Inputs
- **Size Selection:** Button group with equal-width options
  - Pills with clear labels: Small (8oz), Medium (12oz), Large (16oz), Custom
  - Selected state with filled background
  - Custom input reveals number field (8-32oz range)

- **Date/Time Picker:** Native HTML datetime-local input styled consistently
  - Defaults to current time
  - Label above, helper text below
  - Clear icon to reset to "now"

- **Action Buttons:**
  - Primary: "Log Drink" - large (h-12), full width on mobile
  - Secondary: "View All", "Export Data" - standard size (h-10)
  - Destructive: "Delete" - red accent, confirmation dialog required

### Data Display
- **History Table/List:**
  - Desktop: Table with columns (Date, Time, Size, Actions)
  - Mobile: Card-based list with swipe-to-delete
  - Pagination: 20 entries per page
  - Filter options: Date range, size range

- **Statistics Panel:**
  - Metrics grid: 2-column on desktop, 1-column mobile
  - Each metric: Icon, label, value, comparison to previous period
  - Metrics: Total consumption (oz), Busiest day, Longest streak, Most common time

### Images
No hero image needed - this is a utility dashboard app. Focus on iconography:
- Empty states use simple illustrations (glass icon with dotted outline)
- Achievement badges for milestones (10 drinks, 7-day streak, etc.)
- All via Heroicons library, no custom graphics

## Animations

**Minimal, purposeful motion only:**
- Number count-up on dashboard stats (0.5s ease-out)
- Card entry fade-in on log success (0.2s)
- Chart data transitions (0.3s)
- No scroll-triggered animations, no decorative motion

## Accessibility

- All interactive elements minimum 44px touch target
- Form inputs with visible labels (not just placeholders)
- ARIA labels on icon-only buttons
- Focus indicators with 2px outline
- Color contrast ratio minimum 4.5:1 for all text
- Keyboard navigation for all actions (Tab, Enter, Escape)

## Mobile Optimization

- Bottom navigation bar with 4 large tap targets
- Quick-add button as floating action button (FAB) bottom-right
- Swipe gestures: Swipe-to-delete on history items
- Full-screen logging modal on mobile for focused entry
- Responsive charts that collapse gracefully

## Visual Hierarchy

1. **Primary Focus:** Quick-add widget prominently positioned top-center of dashboard
2. **Secondary:** Current stats (today's count, this week)
3. **Tertiary:** Charts and historical data
4. **Background:** All-time statistics and settings

**Information Density:** Balance utility with breathing room - generous padding within cards (p-6), moderate spacing between sections (space-y-8)