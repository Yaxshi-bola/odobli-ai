# Security & Data Governance Policy — Odobli.ai

## Environment & Secrets Policy
- **No Hardcoded Tokens**: Plaintext tokens or database passwords MUST NOT be stored in versioned source files (`config.py`, `App.tsx`, etc.). All sensitive values must be passed via `.env` or deployment secrets management (Vercel, Render).
- **HMAC-SHA256 initData Verification**: All Mini App request parameters sent to the backend are verified against Telegram bot secret keys.

## Data Protection & Sanitization
- **Log Masking**: Passwords, Telegram authentication hashes, and user tokens must be masked in application log streams.
- **Fail-Safe Purging**: In the event of corrupt state, `ErrorBoundary.tsx` purges localized client storage without affecting persistent database records.
