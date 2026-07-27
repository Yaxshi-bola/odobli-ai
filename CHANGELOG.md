# Changelog — Odobli.ai

All notable changes to the Odobli.ai Telegram Mini App & Bot platform will be documented in this file.

## [1.3.5] - 2026-07-27
### Fixed
- Fixed missing `Vazifalar` text label on 4th subtab in `Bolajon.tsx`.
- Updated legacy green styles in `Lifehacklar.tsx` to Soft Rose Pink & Warm Gold system (`card-rose-banner`, `card-pink`, `#DB2777`).
- Fixed Web Audio API suspended context issue in `playTimerSound` in `AppContext.tsx`.
- Resolved `ReferenceError: activeTab is not defined` in `Header.tsx`.

### Added
- Integrated Telegram Mini Apps 2.0 native methods (`disableVerticalSwipes`, `requestFullscreen`, `setHeaderColor`).
- Created comprehensive production system architecture documentation in `docs/`.

## [1.2.0] - 2026-07-27
### Added
- iOS Dynamic Island floating Kitchen Timer component (`DynamicIslandTimer.tsx`).
- Fail-safe `ErrorBoundary.tsx` component wrapped around root `<App />`.

## [1.0.0] - 2026-07-27
### Added
- Initial release of Odobli.ai TMA with Pazanda AI, Bolajon, Lifehacklar, and Profil tabs.
