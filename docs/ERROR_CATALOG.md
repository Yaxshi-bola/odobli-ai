# Error Catalog & Diagnostic Protocol — Odobli.ai

| Error Code | Category | Severity | Description & Diagnostic Fix |
|---|---|---|---|
| `ERR_REF_01` | React Render | **Critical** | Undefined property access in component render lifecycle. Solved via optional chaining (`?.`) and safe default state merging. |
| `ERR_DB_SYNC` | Async Event Loop | **High** | Synchronous SQLite blocking call on asyncio loop. Solved by offloading to `asyncio.to_thread`. |
| `ERR_AUDIO_SUSP` | Web Audio | **Medium** | Web Audio API suspended due to lack of user gesture. Solved via `ctx.resume()` check. |
| `ERR_SECRET_EXP` | Security | **Critical** | Hardcoded token fallback in config file. Solved by enforcing `.env` environment loading. |
