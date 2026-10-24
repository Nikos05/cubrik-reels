# cubrik reels — usine à vidéos

Reels Instagram/TikTok (9:16) de cubrik.ai, toujours dans la même DA : fond papier, mascotte cube,
cartes de chat Claude, labels mono, transitions rapides. Toujours le même message :
**« connecte cubrik à Claude et pilote tout depuis Claude »**.

## Installation (une fois)

```bash
./setup.sh
```

Le script installe Node (via nvm, sans sudo), ffmpeg/ffprobe, les skills HyperFrames, et affiche les deux
connexions à faire dans Claude Code : **Flora** (voix) et, si tu publies, **Ravenpost**.

## Le savoir dans le repo

- `.claude/skills/cubrik-reels/references/product.md` : tout ce que cubrik fait (brokers, IA, prix, sécurité), source cubrik.ai
- `references/audiences.md` : 18 cibles (débutant, expert, déjà perdu, rentable, pressé, petit budget, 18-24, 50+, crypto, MetaTrader…), angles et banque de hooks FR/EN
- `references/voice.md` : voix Algenib (homme) et Gacrux (femme), réglages et pièges de prononciation
- `references/scenes.md` : toutes les scènes disponibles

## Faire une vidéo

Ouvre Claude Code dans ce dossier et demande simplement, par exemple :

> Fais un reel cubrik sur la fonctionnalité « copier un trader », en anglais, CTA COPY.

Claude charge automatiquement le skill `cubrik-reels` (`.claude/skills/cubrik-reels/`) : il écrit le script,
choisit les scènes, génère la voix Algenib dans Flora, vérifie chaque prise, rend la vidéo et écrit la légende.

À la main, une vidéo existante se refait en une commande :

```bash
./produce.sh youtube en      # → renders/cubrik-youtube-en.mp4 + cover
```

Épisodes disponibles : `youtube`, `tradingview`, `propfirm` (EN + FR), et la série en 6 épisodes (EN + FR) :
`sleep`, `emotions`, `claude`, `savedvideos`, `missedalert`, `oneday`, plus `nocode` et `vsia` (FR), et 12 reels personas (FR, EN prêts à générer) :
`expert`, `profitable`, `busy`, `safety`, `metatrader`, `skeptic`, `brokers` (voix Algenib) et
`beginner`, `lostmoney`, `smallbudget`, `genz`, `crypto` (voix Gacrux). Le reel de lancement
(« Claude just killed day traders ») : `REEL_LANG=fr node build.mjs && ./finalize.sh`.

## Avec une personne à l'écran (UGC)

- **Tu te filmes toi-même** : lis les 8 lignes du script en une prise, puis dis à Claude « fais la vidéo
  cubrik <épisode> avec ma prise <fichier> ». Le montage se cale sur ta vraie voix : animation en haut, toi en bas.
- **Avatar IA** : Claude génère les clips parlants à partir d'une photo d'avatar (toujours signalé comme IA).

Détails : `.claude/skills/cubrik-reels/references/ugc.md`.

## Organisation

| Dossier | Contenu |
|---|---|
| `episodes/` | une vidéo = un fichier (script EN/FR, scènes, transitions, traductions) |
| `lib/` | moteur (`core.mjs`), bibliothèque de scènes (`scenes.mjs`) et CSS |
| `assets/` | polices, logos, SFX, voix brutes (`raw-<épisode>-<langue>/`) |
| `captions.md` | toutes les légendes Instagram |
| `renders/` | sorties (non versionnées) |

## Règles

- Pas de promesse de gains, chiffres de démo uniquement, « Not financial advice » dans chaque légende.
- Fonctionnalité pas encore sortie → « coming soon » + CTA accès en avant-première.
- Une personne à l'écran seulement avec son accord ; un avatar IA toujours signalé (étiquette « AI info » + bio).
- **Rien n'est publié sans validation.** Ravenpost : brouillons uniquement.
