# Vehicle Ledger Application

## Overview

This is a full-stack vehicle management application built with React, TypeScript, Express, and PostgreSQL. The system allows users to track and manage their vehicles, record various events (fuel, maintenance, repairs, etc.), and analyze vehicle performance data. The application features a modern mobile-first UI built with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Data Validation**: Zod schemas for request/response validation
- **Storage Layer**: Abstracted storage interface with in-memory implementation (production ready for database integration)

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless PostgreSQL integration
- **Session Storage**: PostgreSQL session store with connect-pg-simple

### Database Schema Design
- **Vehicles Table**: Core vehicle information (name, plate, color, year, odometer, fuel type, status)
- **Vehicle Events Table**: Event tracking system supporting multiple event types (fuel, maintenance, repair, accident, inspection, insurance, milestone)
- **Flexible Event Data**: JSON columns for event-specific details and image storage
- **Relationships**: Foreign key constraints linking events to vehicles

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **Security**: Environment-based configuration for database credentials
- **CORS**: Configured for cross-origin requests in development

### Component Architecture
- **Design System**: Consistent component library with variants using class-variance-authority
- **Accessibility**: Radix UI primitives ensure ARIA compliance and keyboard navigation
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Custom Icons**: SVG-based icon system for domain-specific graphics (odometer, fuel pump, etc.)

### Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Hot Reload**: Development server with HMR and error overlay
- **Code Quality**: Path aliases for clean imports and consistent file organization

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **drizzle-kit**: Database schema management and migration tools
- **express**: Web application framework for Node.js
- **@tanstack/react-query**: Server state management and caching

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx**: Conditional className utility
- **lucide-react**: Icon library for React applications

### Form and Validation Dependencies
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Integration resolvers for validation libraries
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

### Development and Build Dependencies
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Replit-Specific Dependencies
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling integration
- **@replit/vite-plugin-dev-banner**: Development environment banner