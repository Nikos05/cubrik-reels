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
`sleep`, `emotions`, `claude`, `savedvideos`, `missedalert`, `oneday`. Le reel de lancement
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
