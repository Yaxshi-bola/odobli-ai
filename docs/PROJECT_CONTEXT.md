# Odobli.ai — Project Context & System Scope

## Executive Summary
Odobli.ai is a high-availability, scalable Telegram Mini Application (TMA) and AI ecosystem designed specifically for Uzbek families, mothers, and children. It integrates smart AI culinary matchmaking, interactive educational audio/text tales, gamified routine tasks, and lifehacks into a unified 60 FPS mobile-first web app.

## Target Audience
- **Primary**: Uzbek mothers & families seeking daily cooking inspiration and household productivity.
- **Secondary**: Children aged 3–12 engaging with moral stories, math games, riddles, and routine task tracking.

## Core Capabilities & Features
1. **Pazanda AI (Culinary Assistance)**:
   - Dynamic ingredient matchmaking (full & 1-missing ingredient matching).
   - Portion scaling (2, 4, 6, 8, 12 portions with automatic ingredient calculation).
   - Global Kitchen Timer with Web Audio API chime, Haptic Feedback, and Telegram Alerts.
   - Interactive Bozorlik (Shopping List) export and dynamic list management.
2. **Sehrli Bolajon (Child Education & Gamification)**:
   - Audio and interactive storybooks categorized by age group (3-5, 6-8, 9-12 years).
   - Math & Word puzzles with gamified point rewards (`completeActivity`).
   - Daily routine task tracker (Badan tarbiya, Ertak o'qish, O'yinchoqlarni yig'ish).
3. **Lifehacklar (Household Solutions)**:
   - Categorized tips (Karving, O'yinchoq yasash, Uy ishlari) styled with Soft Rose & Gold visual tokens.
4. **Subscription & Payment System**:
   - Telegram Stars & Card payment proof submission flow with instant Admin notification.

## Non-Functional Requirements
- **Performance**: 60 FPS UI transitions, LCP ≤ 1.5s, INP ≤ 100ms.
- **Security**: Kesh-resilient state recovery, Telegram WebApp initData HMAC-SHA256 signature verification.
- **Reliability**: Fail-safe ErrorBoundary fallback with one-click full state purge & cache-buster reload.
