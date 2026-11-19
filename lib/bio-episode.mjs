// TikTok FR "Paulito" series without Claude (build with REEL_NOCLAUDE=1): one fresh hook per reel,
// body from 3 shared templates (+ the result-first template), CTA "lien en bio".
// Voice: only the hook line is new per reel; body lines come from a shared bank
// (assets/vo-bank-fr/<voice>/<key>.wav), assembled by bio-assemble.mjs.
import * as S from "./scenes.mjs";
import { winEpisode } from "./win-episode.mjs";
import { SPECS, STRATS, BANK_TEXT, TEMPLATES, WIN_PAIRS, winWeek } from "./bio-specs.mjs";

// every French string the earlier episodes already translated, so default scene texts render in French
const FRALL = {};
for (const f of ["vsia", "nocode", "missedalert", "lostmoney", "safety", "savedvideos", "youtube", "launchai", "beginner", "busy", "genz", "smallbudget", "expert", "profitable", "skeptic", "crypto", "brokers", "metatrader", "emotions", "oneday", "tradingview"]) {
  try { Object.assign(FRALL, (await import(`../episodes/${f}.mjs`)).default.fr || {}); } catch {}
}
const BODY_FR = {
  "Launch on demo?": "Lancer en démo ?", "Demo account · free · 1% risk per trade": "Compte démo · gratuit · 1 % de risque par trade",
  "✅ Take profit hit · +2R": "✅ Take profit touché · +2R", "Launch the agent?": "Lancer l'agent ?", "/ year": "/ an", "Market data": "Données de marché", "News": "News", "Analytics": "Analyses", "Screeners": "Screeners",
};

const live = (n, st, l1, l2) => S.live(n, { l1, l2, title: st.title, sub: st.sub, foot: st.pair, main: "✅ Take profit hit · +2R", nsub: `${st.title} a clôturé ${st.pair}`, pnl: "+2R", notif: 1.6 });
const describe = (n, st, l1, l2) => S.describe(n, { l1, l2, name: st.name, msg: st.msg, rules: st.rules });
const demo = (n, l1, l2) => S.confirm(n, { l1, l2, title: "Launch on demo?", line1: "Demo account · free · 1% risk per trade" });

const BODIES = {
  T1: (st) => [
    S.brokerGrid(2, { link: true, l1: "ÉTAPE 1", l2: "RELIE TON BROKER" }),
    describe(3, st, "ÉTAPE 2", "ÉCRIS TA STRATÉGIE"),
    S.backtest(4, { l1: "ÉTAPE 3", l2: "BACKTEST D'ABORD" }),
    S.guardrails(5, { l1: "TES RÈGLES", l2: "SUR CHAQUE TRADE" }),
    S.confirm(6, { l1: "RIEN EN LIVE", l2: "SANS TON ACCORD" }),
    live(7, st, "IL TRADE POUR TOI", "JOUR ET NUIT"),
  ],
  T2: (st) => [
    S.brokerGrid(2, { link: true, l1: "ÉTAPE 1", l2: "RELIE TON BROKER" }),
    S.chatAnalyze(3, { l1: "COLLE UNE VIDÉO", l2: "IL EXTRAIT LES RÈGLES" }),
    S.backtest(4, { l1: "TESTÉE SUR", l2: "DES ANNÉES DE DONNÉES" }),
    demo(5, "COMPTE DÉMO", "GRATUIT"),
    S.guardrails(6, { l1: "STOP LOSS", l2: "SUR CHAQUE TRADE" }),
    live(7, st, "IL TRADE POUR TOI", "JOUR ET NUIT"),
  ],
  T3: (st) => [
    S.brokerGrid(2, { link: true, l1: "ÉTAPE 1", l2: "RELIE TON BROKER" }),
    S.library(3, { l1: "CHOISIS UNE STRATÉGIE", l2: "DÉJÀ TESTÉE" }),
    S.backtest(4, { l1: "BACKTEST", l2: "AVANT TOUT RISQUE" }),
    S.analytics(5, { l1: "CHAQUE SEMAINE", l2: "IL T'EXPLIQUE TOUT" }),
    S.confirm(6, { l1: "RIEN EN LIVE", l2: "SANS TON ACCORD" }),
    live(7, st, "IL TRADE POUR TOI", "JOUR ET NUIT"),
  ],
};

export function bioEpisode(id) {
  const sp = SPECS.find((s) => s.id === id);
  if (!sp) throw new Error("unknown bio spec " + id);
  if (sp.tpl === "WIN") {
    const p = WIN_PAIRS[sp.pair];
    return winEpisode({
      id, ...p, when: sp.when, pnl: sp.pnl, pnlTxt: `${sp.pnl}.00`, nsub: `${p.title} a clôturé ${p.pair}`,
      hook: sp.hook, bio: true, connect: ["VOILÀ COMMENT :", "CUBRIK + TON BROKER"],
      zone: sp.zone, order: ["SL + TP PLACÉS", "AUTOMATIQUEMENT"], hit: ["PEU APRÈS", "TAKE PROFIT ATTEINT"],
      recap: { title: "This week", l1: "ET MOI ?", l2: "ZÉRO CLIC", from: 10000, to: 10000 + winWeek(sp.pnl), trades: sp.trades || p.trades(sp.pnl) },
      word: "BIO", fr: { ...FRALL, ...BODY_FR }, voFr: [sp.line, ...TEMPLATES.WIN.map((k) => BANK_TEXT[k])], vo: Array(8).fill(""),
    });
  }
  const st = STRATS[sp.strat];
  return {
    id,
    vo: { en: Array(8).fill(""), fr: [sp.line, ...TEMPLATES[sp.tpl].map((k) => BANK_TEXT[k]), BANK_TEXT.CTA] },
    trans: [null, "zoom", "whipL", "stripes", "whipU", "zoom", "whipL", "zoom"],
    scenes: () => [S[sp.hook.type](1, sp.hook.o), ...BODIES[sp.tpl](st), S.endCard(8, { bio: true })],
    coverCss: "",
    fr: { ...FRALL, ...BODY_FR },
  };
}
