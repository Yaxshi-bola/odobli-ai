# Odobli.ai Architecture & System Topology

## Component Separation
```
+-------------------------------------------------------------------+
|                        Telegram Mobile Client                     |
|  +-------------------------------------------------------------+  |
|  |                 TMA WebView Container (React 18)            |  |
|  |   Header | BottomNav | DynamicIslandTimer | ErrorBoundary   |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     Vercel Edge Global CDN                        |
|        (Static Asset Distribution & Hydration Runtime)           |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                       Telegram Bot API Gateway                    |
|       (Python 3.11 / aiogram v3 / Asyncio Orchestrator)           |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                       Database Storage Layer                      |
|                (Supabase PostgreSQL & LocalStorage)               |
+-------------------------------------------------------------------+
```

## Technology Stack & Framework Versions
- **Frontend Core**: React 18.3.1, TypeScript 5.5, Vite 6.4.3, TailwindCSS 3.4.14
- **Animation & Icons**: Motion 12.0, Lucide React 0.469
- **Backend Orchestrator**: Python 3.11+, aiogram 3.30.0, Pydantic v2
- **Hosting & Infra**: Vercel Serverless Edge, Supabase PostgreSQL, Telegram Bot API 10.2

## Resilience & Rate Limiting Strategy
- **Client Rate Limits**: De-bounced UI handlers, memoized matchers (`useMemo`).
- **State Protection**: Automatic default state fallback merging in `AppContext.tsx`.
- **Fail-Safe Recovery**: `ErrorBoundary.tsx` catches runtime errors, purges `localStorage`, and triggers cache-busting window reloads.
