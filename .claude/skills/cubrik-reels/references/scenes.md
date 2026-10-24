# Scene library (`lib/scenes.mjs`)

Every factory is `name(n, opts)`; `n` is the 1-based scene number, `l1`/`l2` are the black + violet labels.
All visible strings go through `tr()`, so add their French in the episode's `fr` dict.

| Scene | Use for | Options |
|---|---|---|
| `hookFeed` | Hook: fanned YouTube cards "saved · never used" + 2-line headline | `l1, l2, strike` (default true: set false when line 2 is the promise) |
| `hookTV` | Hook: TradingView chart with alert bell | `l1, l2` |
| `hookProp` | Hook: prop-firm challenge "FAILED" | `l1, l2` |
| `hookDesk` | Hook: three monitors bleeding red, then dying | `l1, l2, strike` |
| `hookChat` | Hook: someone asks Claude to trade, cubrik answers "agent ready" | `l1, l2, ask, lines, strike` |
| `hookNotifs` | Hook: morning lock screen full of agent notifications | `l1, l2, time, date, items, strike` |
| `hookCode` | Hook: wall of bot code blurred under a "0 LINES OF CODE" stamp | `l1, l2, stamp` |
| `hookVs` | Hook: manual vs AI comparison table (discipline/time, never returns) | `l1, l2, rows` |
| `connect` | Scene 2 almost always: "Connect cubrik to Claude" (Claude tile ↔ cubrik tile) | `l1, l2` |
| `broker` | "connect my broker" → Binance / MetaTrader / Hyperliquid checked | `l1, l2, msg` |
| `describe` | User describes a strategy in words → rules → "Agent created" | `l1, l2, msg, rules, agent` |
| `skills` | Claude Skills grid, one gets picked | `l1, l2, skills, pick, ring` |
| `ytCopy` | YouTube player → Share → Copy link | `l1, l2, tap` |
| `chatAnalyze` | Paste link in Claude → cubrik analyzes → rules card | `l1, l2` |
| `clarify` | cubrik asks follow-up questions, chips get tapped | `l1, l2, qs` |
| `backtest` | Equity curve + stats (keep stats positive & plausible) | `l1, l2, sub, stats` |
| `live` | Phone notification "agent took a trade" + PnL | `l1, l2, title, main, sub, notif, nsub, pnl, foot` |
| `confirm` | "Nothing goes live without your OK" confirm sheet + tap | `l1, l2, title, line1, line2, tap` |
| `endCard` | CTA `Comment "WORD"` (font auto-sized) | `word, sub` (`"&amp; get early access"` for coming-soon features) |
| `tvWebhook` | Ask Claude for a webhook URL | `l1, l2, msg` |
| `tvAlert` | Paste webhook in a TradingView alert | `l1, l2` |
| `tvFlow` | Alert → cubrik → broker order flow | `l1, l2` |
| `guardrails` | Risk rules applied to every trade (checklist rows) | `l1, l2, title, rows, foot` |
| `propRules` | Tell Claude your challenge rules | `l1, l2, msg` |
| `propGauges` | Daily loss / drawdown gauges live | `l1, l2` |
| `propBlocked` | Order that breaks a rule gets blocked | `l1, l2` |

Proven sequences (look at the episode files). Every hook visual is used once per batch — vary them:
- `episodes/youtube.mjs` — hookFeed, connect, ytCopy, chatAnalyze, clarify, backtest, confirm, endCard
- `episodes/tradingview.mjs` — hookTV, connect, tvWebhook, tvAlert, tvFlow, guardrails, live, endCard
- `episodes/propfirm.mjs` — hookProp, connect, propRules, propGauges, propBlocked, backtest, confirm, endCard
- US series (EN only): `sleep` (hookNotifs), `emotions` (hookDesk), `claude` (hookChat, "STEP 1…5" labels),
  `savedvideos` (hookFeed, no strike), `missedalert` (hookTV), `oneday` (hookProp)
- `nocode` (hookCode, describe) and `vsia` (hookVs) — TikTok FR

## Writing a new scene
Return `{ html, js, sfx, min }`:
- `html`: a `<div class="scene" …>` with `labels(l1,l2)`, a `.cam` wrapper and `mascot()`.
- `js`: GSAP calls against the shared `tl`, offset by the scene start `S[n-1]` (copy an existing factory).
- `sfx`: `[[file, timeInScene, volume, durationOpt]]` from `assets/sfx/`.
- `min`: minimum duration in seconds (the engine stretches to the voice line).
Put its CSS in `lib/scene-css.mjs`, prefixed with a scene-specific class.
