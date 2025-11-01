# Chocolate Milk Tracker

## Overview

A single-page application for tracking chocolate milk consumption with daily logging, statistics visualization, and consumption history. Built as a utility-focused tracking tool with a playful personality following Material Design principles. The application emphasizes quick drink logging (target: 3 seconds or less) and at-a-glance data insights through a clean dashboard interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component System**: Built on shadcn/ui (Radix UI primitives) with the "new-york" style variant, providing a comprehensive set of accessible, customizable components. All UI components are co-located in `client/src/components/ui/`.

**Styling**: Tailwind CSS with a custom design system featuring:
- CSS variables for theming with light/dark mode support
- Custom spacing primitives (2, 4, 6, 8, 12, 16, 24px units)
- Material Design-inspired elevation system using transparency layers
- Typography system combining Inter (body/data) and Poppins (display/stats) fonts from Google Fonts

**State Management**: 
- TanStack Query (React Query) for server state management with custom query client configuration
- Local React state for UI interactions
- Theme context provider for light/dark mode persistence

**Routing**: Wouter for lightweight client-side routing (currently single-page with 404 fallback).

**Data Visualization**: Recharts library for consumption charts with responsive containers and customizable 7-day/30-day views.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with the following endpoints:
- `GET /api/drinks` - Retrieve all drinks
- `GET /api/drinks/:id` - Retrieve single drink
- `POST /api/drinks` - Create new drink entry
- `DELETE /api/drinks/:id` - Remove drink entry

**Data Validation**: Zod schemas derived from Drizzle ORM definitions for type-safe request validation.

**Development Environment**: Vite middleware integration for HMR (Hot Module Replacement) in development mode with custom error overlay and logging.

### Data Storage

**Current Implementation**: In-memory storage using a Map-based implementation (`MemStorage` class) for development/testing.

**Intended Production Storage**: PostgreSQL database through Drizzle ORM (configured but not yet connected):
- Database provider: Neon serverless PostgreSQL
- ORM: Drizzle with schema definition in `shared/schema.ts`
- Schema includes: drinks table with id (UUID), sizeOz (integer), timestamp, and optional note field
- Migration support configured via drizzle-kit

**Data Model**:
```typescript
Drink {
  id: string (UUID)
  sizeOz: number
  timestamp: Date
  note: string | null
}
```

### Design System

**Component Hierarchy**:
- **StatCard**: Displays key metrics with icon, title, value, and optional subtitle
- **QuickAddWidget**: Primary interaction point for logging drinks with preset sizes (S/M/L: 8/12/16oz) and custom input
- **RecentActivity**: Scrollable list of drink entries grouped by date with delete functionality
- **ConsumptionChart**: Bar chart visualization with togglable 7-day/30-day views
- **ThemeToggle**: Persistent light/dark mode switcher using local storage

**Layout Approach**:
- Dashboard uses a card-based grid system
- Mobile-first responsive design with Tailwind breakpoints
- 12-column desktop grid with potential for sidebar navigation
- Single-column stack on mobile with collapsible navigation

### Build & Deployment

**Build Process**:
- Frontend: Vite builds to `dist/public/`
- Backend: esbuild bundles server code to `dist/` as ESM module
- TypeScript compilation checking without emit (runtime transpilation via tsx/esbuild)

**Environment Configuration**:
- `DATABASE_URL` required for PostgreSQL connection
- Development server runs on Vite dev server with Express middleware
- Production serves static files from built frontend

## External Dependencies

### Core Frameworks
- **React 18**: UI framework with TypeScript support
- **Express**: Backend HTTP server
- **Vite**: Frontend build tool and dev server
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect

### Database
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

### UI Libraries
- **@radix-ui**: Complete primitive component collection (accordion, dialog, dropdown, select, toast, tooltip, etc.)
- **shadcn/ui**: Pre-styled component system built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Declarative chart library for React
- **Lucide React**: Icon library
- **cmdk**: Command menu component
- **embla-carousel-react**: Carousel/slider component
- **vaul**: Drawer component

### State & Data Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Validation resolver for react-hook-form
- **zod**: Schema validation library
- **drizzle-zod**: Bridge between Drizzle schemas and Zod validation

### Utilities
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional className utilities
- **class-variance-authority**: Component variant styling utility
- **wouter**: Lightweight routing library
- **nanoid**: Unique ID generation

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit integration
- **@replit/vite-plugin-dev-banner**: Development banner
- **tsx**: TypeScript execution for development server
- **esbuild**: Production bundler for backend
- **TypeScript**: Type system and compiler
- **PostCSS**: CSS processing with Tailwind