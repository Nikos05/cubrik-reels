// Data for the "Paulito, lien en bio" series without Claude (see bio-episode.mjs).
// Amounts are demo-account illustrations, said and labelled as such.

// Shared spoken lines. M = Algenib (male), F = Gacrux (female); each exists in both voices except W*, male only.
export const BANK_TEXT = {
  B1: "D'abord, tu connectes ton broker à cubrik. MetaTrader, Binance ou un autre.",
  B2: "Tu écris ta stratégie avec tes mots. cubrik en fait un agent.",
  B3: "Il la teste sur des années de données avant de risquer un euro.",
  B4: "Stop loss sur chaque trade. Perte max par jour.",
  B5: "Tu commences sur un compte démo, gratuit.",
  B6: "Et ton agent trade pour toi, jour et nuit.",
  B7: "Rien ne passe en live sans ton accord.",
  B8: "Tu colles une vidéo YouTube de stratégie. cubrik en extrait chaque règle.",
  B9: "Chaque semaine, il te dit ce qui marche et ce qui te coûte.",
  B10: "Tu choisis une stratégie déjà testée dans la bibliothèque.",
  W2: "Voilà comment. J'ai relié cubrik à mon broker.",
  W3: "Je lui ai donné une stratégie précise, en une phrase.",
  W4: "Le prix est revenu pile dans ma zone.",
  W5: "L'IA est entrée. Stop loss et take profit, placés tout seuls.",
  W6: "Peu après : take profit.",
  W7: "Et moi ? Je n'ai rien touché. Zéro clic.",
  CTA: "Le lien est dans ma bio. Teste-le gratuitement.",
};
export const TEMPLATES = {
  T1: ["B1", "B2", "B3", "B4", "B7", "B6"],
  T2: ["B1", "B8", "B3", "B5", "B4", "B6"],
  T3: ["B1", "B10", "B3", "B9", "B7", "B6"],
  WIN: ["W2", "W3", "W4", "W5", "W6", "W7", "CTA"],
};

const R = (m, e, x, r = "1 % par trade") => [["MARKET", m], ["ENTRY", e], ["EXIT", x], ["RISK", r]];
export const STRATS = {
  GOLD: { name: "GOLD LONDON BREAKOUT", title: "Gold London Breakout", sub: "TOURNE 24H/24 SUR METATRADER 5", pair: "XAU/USD", msg: "achète l'or quand Londres casse le plus haut asiatique, 1 % de risque, objectif 2R", rules: R("XAU/USD · 15 min", "Cassure du plus haut asiatique", "Stop sous le range · 2R") },
  BTC: { name: "BTC RANGE BREAK", title: "BTC Range Break", sub: "TOURNE 24H/24 SUR BINANCE", pair: "BTC/USDT", msg: "achète BTC quand il casse le plus haut du jour avec du volume, 1 % de risque", rules: R("BTC/USDT · 1 heure", "Cassure du plus haut du jour + volume", "Stop sous le range · objectif 2R") },
  SOL: { name: "SOL TREND RIDER", title: "SOL Trend Rider", sub: "TOURNE 24H/24 SUR BINANCE", pair: "SOL/USDT", msg: "achète SOL quand il reclôture au-dessus de l'EMA 50 en 4h après un repli, 1 % de risque", rules: R("SOL/USDT · 4 heures", "Reprise de l'EMA 50 après un repli", "Stop sous le swing · objectif 2R") },
  ETH: { name: "ETH PULLBACK", title: "ETH Pullback", sub: "TOURNE 24H/24 SUR BINANCE", pair: "ETH/USDT", msg: "achète ETH sur un repli à la VWAP en tendance haussière, 1 % de risque", rules: R("ETH/USDT · 1 heure", "Repli sur la VWAP en tendance", "Stop sous le swing · objectif 2R") },
  EUR: { name: "EUR/USD LONDON FADE", title: "EUR/USD London Fade", sub: "TOURNE 24H/24 SUR METATRADER 5", pair: "EUR/USD", msg: "vends EUR/USD quand Londres dépasse le plus haut asiatique puis réintègre, 1 % de risque", rules: R("EUR/USD · 15 min", "Fausse cassure du plus haut asiatique", "Stop au-dessus de la mèche · 2R") },
  NAS: { name: "NAS100 OPEN DRIVE", title: "NAS100 Open Drive", sub: "TOURNE 24H/24 SUR METATRADER 5", pair: "NAS100", msg: "achète le NAS100 quand la première bougie de 15 min casse à la hausse, stop dessous, 2R", rules: R("NAS100 · 5 min", "Cassure de la 1re bougie de 15 min", "Stop sous la bougie · 2R", "0,5 % par trade") },
};

const wt = (pair) => (p) => [[pair, "LONG · TP", `+$${p}.00`], [pair, "LONG · SL", `−$${Math.round(p / 2)}.00`], [pair, "LONG · TP", `+$${p + 36}.00`]];
export const winWeek = (p) => p + (p + 36) - Math.round(p / 2);
export const WIN_PAIRS = {
  GOLD: { title: "Gold Asia Reclaim", pair: "XAU/USD", side: "LONG", tf: "1H", broker: "METATRADER 5", name: "GOLD ASIA RECLAIM", entry: "4,186", sl: "4,177", tp: "4,204", prompt: "achète l'or quand il passe sous le plus bas asiatique puis reclôture au-dessus, 1 % de risque, objectif 2R", rules: R("XAU/USD · 1h", "Passage sous le plus bas asiatique + reprise", "TP 2R · SL sous la mèche"), trades: wt("XAU/USD") },
  BTC: { title: "BTC Range Break", pair: "BTC/USDT", side: "LONG", tf: "1H", broker: "BINANCE", name: "BTC RANGE BREAK", entry: "96,400", sl: "95,800", tp: "97,600", prompt: "achète BTC quand il casse le plus haut du jour avec du volume, 1 % de risque, objectif 2R", rules: R("BTC/USDT · 1h", "Cassure du plus haut du jour + volume", "TP 2R · SL sous le range"), trades: wt("BTC/USDT") },
  EUR: { title: "EUR/USD Pullback", pair: "EUR/USD", side: "LONG", tf: "1H", broker: "METATRADER 5", name: "EUR/USD PULLBACK", entry: "1.0842", sl: "1.0827", tp: "1.0872", prompt: "achète EUR/USD sur un repli à la zone de 1.0840 en tendance haussière, 1 % de risque, objectif 2R", rules: R("EUR/USD · 1h", "Repli sur la zone 1.0840", "TP 2R · SL sous la zone"), trades: wt("EUR/USD") },
  NAS: { title: "NAS100 Open Drive", pair: "NAS100", side: "LONG", tf: "5M", broker: "METATRADER 5", name: "NAS100 OPEN DRIVE", entry: "21,340", sl: "21,290", tp: "21,440", prompt: "achète le NAS100 quand la première bougie de 15 min casse à la hausse, stop dessous, objectif 2R", rules: R("NAS100 · 5 min", "Cassure de la 1re bougie de 15 min", "TP 2R · SL sous la bougie", "0,5 % par trade"), trades: wt("NAS100") },
  SOL: { title: "SOL Trend Rider", pair: "SOL/USDT", side: "LONG", tf: "4H", broker: "BINANCE", name: "SOL TREND RIDER", entry: "182.40", sl: "179.90", tp: "187.40", prompt: "achète SOL quand il reclôture au-dessus de l'EMA 50 en 4h après un repli, 1 % de risque, objectif 2R", rules: R("SOL/USDT · 4h", "Reprise de l'EMA 50 après un repli", "TP 2R · SL sous le swing"), trades: wt("SOL/USDT") },
};

const notif = (a, b, c) => [["🛡", a, "02:38"], ["↗", b, "04:11"], ["✅", c, "06:20"]];
// In posting order (Nov 18 → 30, 3 a day). voice: M or F.
export const SPECS = [
  { id: "b-iatue", voice: "M", tpl: "T1", strat: "NAS", line: "L'IA vient de tuer les day traders.", hook: { type: "hookDesk", o: { l1: "L'IA VIENT DE TUER", l2: "LES DAY TRADERS", strike: true } } },
  { id: "b-wboulot", voice: "M", tpl: "WIN", pair: "GOLD", pnl: 412, when: "10:42", line: "J'ai gagné quatre cent douze dollars pendant que j'étais au boulot. Sur mon compte démo.", hook: ["PENDANT QUE", "J'ÉTAIS AU BOULOT"], zone: ["10 H 40 : RETOUR", "DANS MA ZONE"] },
  { id: "b-btcnuit", voice: "F", tpl: "T1", strat: "BTC", line: "Le Bitcoin bouge à trois heures du matin. Toi, tu dors.", hook: { type: "hookNotifs", o: { l1: "LE BITCOIN BOUGE À 3 H", l2: "TOI, TU DORS", time: "7:08", date: "PENDANT QUE TU DORMAIS", items: notif("Évité · pic de funding BTC", "Stop au point mort · BTC", "Take profit touché · BTC +2R") } } },

  { id: "b-testsemaine", voice: "M", tpl: "T3", strat: "GOLD", line: "Une IA qui trade pour moi ? J'ai testé pendant une semaine.", hook: { type: "hookChat", o: { l1: "UNE IA QUI TRADE ?", l2: "J'AI TESTÉ 7 JOURS", ask: "trade ma stratégie 7 jours", lines: ["✓ Stratégie chargée", "✓ Broker relié · MetaTrader 5", "✓ Agent prêt · attend ton accord"] } } },
  { id: "b-8hecran", voice: "M", tpl: "T1", strat: "EUR", line: "Tu passes huit heures par jour devant tes graphiques ? Arrête.", hook: { type: "hookVs", o: { l1: "8 H PAR JOUR", l2: "DEVANT TES GRAPHIQUES ?" } } },
  { id: "b-algos", voice: "M", tpl: "T3", strat: "NAS", line: "Les hedge funds tradent avec des algos depuis trente ans. Maintenant, c'est ton tour.", hook: { type: "hookPrice", o: { l1: "LES HEDGE FUNDS", l2: "ONT DES ALGOS", title: "Algo de hedge fund", seat: "PAR AN", now: "Maintenant sur cubrik", nowSub: "DÉMO GRATUITE" } } },

  { id: "b-botcode", voice: "M", tpl: "T1", strat: "GOLD", line: "Les bots de trading à cinq cents euros, c'est fini.", hook: { type: "hookCode", o: { l1: "TON BOT DE TRADING", l2: "SANS CODER", stamp: "0 LIGNE DE CODE" } } },
  { id: "b-wsalle", voice: "M", tpl: "WIN", pair: "BTC", pnl: 290, when: "19:08", line: "Plus deux cent quatre-vingt-dix dollars sur le Bitcoin pendant que j'étais à la salle. Compte démo.", hook: ["PENDANT QUE", "J'ÉTAIS À LA SALLE"], zone: ["19 H : RETOUR", "DANS MA ZONE"] },
  { id: "b-marchedort", voice: "F", tpl: "T2", strat: "BTC", line: "Le marché ne dort jamais. Ton agent non plus.", hook: { type: "hookNotifs", o: { l1: "LE MARCHÉ NE DORT JAMAIS", l2: "TON AGENT NON PLUS", time: "6:55", date: "PENDANT TA NUIT", items: notif("Évité · news CPI dans 5 min", "Stop au point mort · XAU/USD", "Take profit touché · +2R") } } },

  { id: "b-arnaque", voice: "M", tpl: "T1", strat: "GOLD", line: "Je pensais que les bots de trading, c'était une arnaque.", hook: { type: "hookSafe", o: { l1: "LES BOTS DE TRADING,", l2: "UNE ARNAQUE ?" } } },
  { id: "b-jobia", voice: "M", tpl: "T3", strat: "EUR", line: "Tu as un job ? Ton IA trade pendant que tu bosses.", hook: { type: "hookNotifs", o: { l1: "TU AS UN JOB ?", l2: "TON IA TRADE QUAND MÊME", time: "14:30", date: "PENDANT TA RÉUNION", items: [["🛡", "Évité · discours de la BCE", "09:58"], ["↗", "Stop au point mort · EUR/USD", "11:12"], ["✅", "Take profit touché · EUR/USD +2R", "13:47"]] } } },
  { id: "b-wdodo2", voice: "M", tpl: "WIN", pair: "EUR", pnl: 380, when: "03:14", line: "Trois cent quatre-vingts dollars sur l'euro dollar pendant que je dormais. Compte démo.", hook: ["PENDANT QUE", "JE DORMAIS"], zone: ["3 H DU MATIN : RETOUR", "DANS MA ZONE"] },

  { id: "b-iatuemain", voice: "M", tpl: "T2", strat: "GOLD", line: "L'IA vient de tuer le trading à la main.", hook: { type: "hookDesk", o: { l1: "L'IA VIENT DE TUER", l2: "LE TRADING À LA MAIN", strike: true } } },
  { id: "b-crypto247", voice: "F", tpl: "T1", strat: "SOL", line: "La crypto tourne vingt-quatre heures sur vingt-quatre. Ton IA aussi.", hook: { type: "hookTV", o: { l1: "LA CRYPTO TOURNE 24H/24", l2: "TON IA AUSSI" } } },
  { id: "b-poteri", voice: "M", tpl: "T1", strat: "GOLD", line: "Mon pote m'a dit qu'une IA tradait pour lui. J'ai rigolé.", hook: { type: "hookChat", o: { l1: "UNE IA TRADE POUR MON POTE", l2: "J'AI RIGOLÉ", ask: "trade l'or pendant que je bosse", lines: ["✓ Stratégie chargée", "✓ Broker relié · MetaTrader 5", "✓ Agent prêt · attend ton accord"] } } },

  { id: "b-setupsrates", voice: "M", tpl: "T2", strat: "GOLD", line: "Tu rates tes setups parce que tu es au boulot ? Normal.", hook: { type: "hookTV", o: { l1: "TU RATES TES SETUPS ?", l2: "PARCE QUE TU BOSSES" } } },
  { id: "b-wrepas", voice: "M", tpl: "WIN", pair: "NAS", pnl: 520, when: "15:47", line: "Cinq cent vingt dollars sur le Nasdaq pendant que je mangeais. Compte démo.", hook: ["PENDANT QUE", "JE MANGEAIS"], zone: ["15 H 30 : OUVERTURE", "DANS MA ZONE"] },
  { id: "b-wallst2", voice: "M", tpl: "T1", strat: "NAS", line: "Ce que Wall Street paie trente mille dollars par an, tu l'as dans une app.", hook: { type: "hookPrice", o: { l1: "WALL STREET PAIE", l2: "30 000 $ PAR AN", title: "Terminal de marché pro", seat: "PAR POSTE · PAR AN", now: "Maintenant sur cubrik", nowSub: "DÉMO GRATUITE" } } },

  { id: "b-videos", voice: "M", tpl: "T2", strat: "GOLD", line: "Tu enregistres des vidéos de trading que tu n'appliques jamais ?", hook: { type: "hookFeed", o: { l1: "TES VIDÉOS DE TRADING", l2: "JAMAIS APPLIQUÉES", strike: true } } },
  { id: "b-ethnuit", voice: "F", tpl: "T3", strat: "ETH", line: "L'Ethereum a bougé de cinq pour cent cette nuit. Mon agent était réveillé.", hook: { type: "hookNotifs", o: { l1: "L'ETHEREUM A BOUGÉ", l2: "MON AGENT ÉTAIT LÀ", time: "7:20", date: "PENDANT QUE TU DORMAIS", items: notif("Évité · spread trop large · ETH", "Stop au point mort · ETH", "Take profit touché · ETH +2R") } } },
  { id: "b-wfoot", voice: "M", tpl: "WIN", pair: "GOLD", pnl: 270, when: "21:12", line: "Deux cent soixante-dix dollars sur l'or pendant mon match de foot. Compte démo.", hook: ["PENDANT", "MON MATCH DE FOOT"], zone: ["21 H : RETOUR", "DANS MA ZONE"] },

  { id: "b-discipline", voice: "M", tpl: "T1", strat: "EUR", line: "Une IA plus disciplinée que moi ? J'y croyais pas.", hook: { type: "hookChat", o: { l1: "PLUS DISCIPLINÉE QUE MOI ?", l2: "J'Y CROYAIS PAS", ask: "applique mes règles, sans peur", lines: ["✓ Règles chargées", "✓ Stop loss sur chaque trade", "✓ Agent prêt · attend ton accord"] } } },
  { id: "b-bougies", voice: "M", tpl: "T3", strat: "NAS", line: "Ta stratégie marche déjà ? Alors arrête de regarder chaque bougie.", hook: { type: "hookVs", o: { l1: "TA STRATÉGIE MARCHE ?", l2: "LÂCHE LES BOUGIES" } } },
  { id: "b-signaux", voice: "M", tpl: "T1", strat: "GOLD", line: "Tu suis encore des signaux Telegram ? Regarde ça.", hook: { type: "hookLoss", o: { l1: "LES SIGNAUX TELEGRAM ?", l2: "REGARDE ÇA" } } },

  { id: "b-wdodo3", voice: "M", tpl: "WIN", pair: "SOL", pnl: 310, when: "04:21", line: "Plus trois cent dix dollars sur Solana pendant que je dormais. Compte démo.", hook: ["PENDANT QUE", "JE DORMAIS"], zone: ["4 H DU MATIN : RETOUR", "DANS MA ZONE"] },
  { id: "b-nuitsblanches", voice: "M", tpl: "T3", strat: "GOLD", line: "L'IA vient de tuer les nuits blanches devant les graphiques.", hook: { type: "hookNotifs", o: { l1: "L'IA VIENT DE TUER", l2: "LES NUITS BLANCHES", time: "7:02", date: "PENDANT QUE TU DORMAIS", items: notif("Évité · news CPI dans 5 min", "Stop au point mort · XAU/USD", "Take profit touché · +2R") } } },
  { id: "b-weekend", voice: "F", tpl: "T2", strat: "BTC", line: "La crypto trade le week-end. Toi, tu profites.", hook: { type: "hookTV", o: { l1: "LA CRYPTO TRADE LE WEEK-END", l2: "TOI, TU PROFITES" } } },

  { id: "b-testdemo", voice: "M", tpl: "T2", strat: "GOLD", line: "J'ai testé une IA de trading sur un compte démo. Voilà comment ça marche.", hook: { type: "hookSafe", o: { l1: "J'AI TESTÉ UNE IA", l2: "SUR UN COMPTE DÉMO" } } },
  { id: "b-wmetro", voice: "M", tpl: "WIN", pair: "GOLD", pnl: 350, when: "08:52", line: "Trois cent cinquante dollars sur l'or pendant mon trajet en métro. Compte démo.", hook: ["PENDANT", "MON TRAJET EN MÉTRO"], zone: ["8 H 45 : RETOUR", "DANS MA ZONE"] },
  { id: "b-emotions", voice: "M", tpl: "T1", strat: "EUR", line: "Ta stratégie est bonne. Ce sont tes émotions qui te coûtent.", hook: { type: "hookDesk", o: { l1: "TA STRATÉGIE EST BONNE", l2: "TES ÉMOTIONS, NON", strike: false } } },

  { id: "b-banques", voice: "M", tpl: "T2", strat: "NAS", line: "Les algos de trading, c'était réservé aux banques. Plus maintenant.", hook: { type: "hookPrice", o: { l1: "LES ALGOS DES BANQUES", l2: "POUR TOUT LE MONDE", title: "Algo de trading pro", seat: "PAR AN", now: "Maintenant sur cubrik", nowSub: "DÉMO GRATUITE" } } },
  { id: "b-vacances", voice: "F", tpl: "T3", strat: "BTC", line: "Je suis en vacances. Mon agent, lui, surveille le Bitcoin.", hook: { type: "hookNotifs", o: { l1: "JE SUIS EN VACANCES", l2: "MON AGENT TRADE", time: "10:15", date: "PENDANT TES VACANCES", items: notif("Évité · pic de funding BTC", "Stop au point mort · BTC", "Take profit touché · BTC +2R") } } },
  { id: "b-wdodo4", voice: "M", tpl: "WIN", pair: "BTC", pnl: 460, when: "02:47", line: "Quatre cent soixante dollars sur le Bitcoin pendant que je dormais. Compte démo.", hook: ["PENDANT QUE", "JE DORMAIS"], zone: ["2 H 45 : RETOUR", "DANS MA ZONE"] },

  { id: "b-iatuebots", voice: "M", tpl: "T3", strat: "GOLD", line: "L'IA vient de tuer les bots qu'il fallait coder.", hook: { type: "hookCode", o: { l1: "L'IA VIENT DE TUER", l2: "LES BOTS À CODER", stamp: "0 LIGNE DE CODE" } } },
  { id: "b-pasletemps", voice: "M", tpl: "T1", strat: "GOLD", line: "Pas le temps de trader ? Ton agent, lui, l'a.", hook: { type: "hookVs", o: { l1: "PAS LE TEMPS", l2: "DE TRADER ?" } } },
  { id: "b-1semaine", voice: "M", tpl: "T3", strat: "EUR", line: "J'ai laissé une IA trader à ma place pendant une semaine. En démo.", hook: { type: "hookChat", o: { l1: "J'AI LAISSÉ UNE IA", l2: "TRADER UNE SEMAINE", ask: "trade mon plan 7 jours en démo", lines: ["✓ Plan chargé", "✓ Compte démo relié", "✓ Agent prêt · attend ton accord"] } } },

  { id: "b-wreunion", voice: "M", tpl: "WIN", pair: "EUR", pnl: 240, when: "11:20", line: "Deux cent quarante dollars sur l'euro dollar pendant ma réunion. Compte démo.", hook: ["PENDANT", "MA RÉUNION"], zone: ["11 H : RETOUR", "DANS MA ZONE"] },
  { id: "b-terminal", voice: "M", tpl: "T2", strat: "NAS", line: "Un terminal à trente mille dollars, ou une app gratuite en démo ?", hook: { type: "hookPrice", o: { l1: "UN TERMINAL À 30 000 $", l2: "OU UNE APP GRATUITE ?", title: "Terminal de marché pro", seat: "PAR POSTE · PAR AN", now: "Maintenant sur cubrik", nowSub: "DÉMO GRATUITE" } } },
  { id: "b-scroll", voice: "F", tpl: "T1", strat: "BTC", line: "Pendant que tu scrolles, le Bitcoin bouge.", hook: { type: "hookNotifs", o: { l1: "PENDANT QUE TU SCROLLES", l2: "LE BITCOIN BOUGE", time: "22:41", date: "PENDANT QUE TU SCROLLAIS", items: [["🛡", "Évité · volume trop faible · BTC", "21:58"], ["↗", "Entrée · BTC · 1 % de risque", "22:16"], ["✅", "Take profit touché · BTC +2R", "22:39"]] } } },
];
