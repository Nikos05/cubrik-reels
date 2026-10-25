# cubrik — product facts (source of truth for scripts and captions)

Captured from cubrik.ai (home, /pricing, /faq) on 2026-10-24. Re-check the site before claiming anything new;
if a fact is not here or on the site, don't say it in a video.
Links: site https://cubrik.ai · mobile apps (App Store + Google Play) https://cubrik.ai/app-download

## One-liner
A trading workspace with every AI on the market, connected to your broker. You describe or pick a strategy,
an agent runs it at the planned times, you follow everything in a chat (and in Claude via the cubrik MCP).
cubrik never holds your funds. Site tagline: "If you can explain it, it can trade it."

## Brokers (official list)
OKX · MetaTrader 4 and 5 · Binance · Bitget · Kraken · Coinbase · eToro · Interactive Brokers · Robinhood · MoonX
— across crypto, forex, indices and commodities. "If yours isn't there yet, write to us."
Logos: `assets/logos/brokers/` (official files from cubrik.ai). Library scenes: `broker()` (chat, 3 rows + "+7"),
`brokerGrid()` (all 10).
⚠️ Hyperliquid is NOT on the site's list (older videos show it) — don't use it in new content unless the team confirms.

Connection: one-click where the broker offers it, otherwise an API key with no withdrawal rights, or an encrypted
login for MetaTrader 4/5. About 30 seconds, once. Revocable any time.

## AIs
Claude, GPT, Gemini, Grok, DeepSeek, Qwen, Kimi, Mistral, Llama, Perplexity (+ new versions), plus **Jev**, the
model trained on trading that scores your strategies ("Jev score"). Jev is NOT a cubrik-built model: cubrik has no
model of its own, so never say "our own model" (logo: `yt/assets/ai/jev.png`). Three modes choose the model: Fast (scans,
alerts), Balanced (strategies, analyses), Precise (backtests, live decisions). You can force a model.
"The most powerful models, one subscription."

## What it does
- Describe a strategy in plain language (no code). cubrik asks what's missing: pairs, timeframe, risk per trade, leverage.
- Jev scores it, backtest replays it on past prices (12 months on Beginner, 5 years with fees + slippage from Intermediate).
- Demo first: free Demo plan, no time limit; recommendation: ≥14 days and ≥20 trades on demo before going live.
- The agent scans at the plan's frequency (1 h / 30 min / 15 min / 5 min), places orders with stop + target at
  the broker, notifies on every pass. Ask in chat why it didn't enter, change a setting, pause, stop.
- Several pairs per strategy. 14 ready strategies in the catalogue.
- **YouTube → agent (live since Oct 2026):** paste the link of any YouTube strategy video, cubrik watches it, pulls out
  every rule, asks what the video forgot, builds the agent (then backtest / demo / approval as usual). No longer "coming soon".
- **TradingView alerts → orders (live since Oct 2026):** ask Claude/cubrik for a webhook, paste it in a TradingView alert,
  the Pine script stays the same; every alert becomes an order on the broker in seconds, with stops and daily loss limits.
  No longer "coming soon".
- **Library:** 13,353 agents shared by members, each with its backtest. Copy one, change one rule, it starts on your
  broker. "No ranking, no promises."
- **Analytics that talk back:** reads your account, finds where the money goes (e.g. by session), recommends
  changes with an Apply button. Daily analysis on every plan.
- Market: AI read and calendar; personalised morning market report (Pro+).
- Apps: web, desktop, iOS, Android — same agents, same notifications.
- Scale proof on the site: "More than 4.7M trades taken by cubrik agents" (demo accounts first).

## Safety (use these exact ideas, they are true and reassuring)
- Funds never leave the broker; trade-only access, **no withdrawal rights, ever**; revoke in one tap.
- Stops and targets live **at the broker**, not in the agent's memory → they hold even if cubrik is offline.
- Three independent safeguards: max daily loss per agent (e.g. −3%), hourly risk alert that cuts above a global
  limit (e.g. −5%), and the broker-side stops. None depends on the AI or on credits.
- Broker tokens encrypted, nothing trains a model, delete history anytime, GDPR compliant.
- "Does AI remove the risk of losing? No." What it removes is **human error**: the widened stop, the size doubled
  after a loss, the late entry, the 11 pm boredom trade. → Our core emotional angle.

## Pricing (excl. VAT)
Demo free (no card) · Beginner 19 €/mo (2 accounts, 2 agents, hourly scan, 4,000 credits) · Intermediate 59 €
(5/5, 30 min, 5-year backtests) · Pro 199 € (15/15, 15 min, morning report, memory) · Max 399 € (unlimited
accounts, 50 agents, 5 min, priority execution, API) · Company 2,199 € · Enterprise on request.
Annual −16%. Extra credits: 1,000 per 5 €, never expire. Out of credits → agents stop, stops stay, risk alert runs.

## Claims we never make
Income or win promises, "guaranteed", "risk-free", specific returns as a promise. Demo numbers on screen are
illustrations (keep them modest: +2R, 58–61% win rate). Always: "Not financial advice / Pas un conseil financier".
"cubrik works with Claude" — never "Anthropic partner/official".
