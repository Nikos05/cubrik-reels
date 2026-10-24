#!/bin/zsh
# One-time setup on macOS, no sudo: Node LTS (nvm), ffmpeg + ffprobe in ~/.local/bin, HyperFrames skills.
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null; then
  echo "→ Node LTS via nvm"
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
  nvm install --lts
fi
echo "✓ node $(node -v)"

mkdir -p ~/.local/bin
export PATH="$HOME/.local/bin:$PATH"
for tool in ffmpeg ffprobe; do
  if ! command -v $tool >/dev/null; then
    echo "→ $tool (static build)"
    curl -fsSL -o /tmp/$tool.zip "https://evermeet.cx/ffmpeg/getrelease/$tool/zip"
    unzip -o -q /tmp/$tool.zip -d ~/.local/bin && chmod +x ~/.local/bin/$tool && rm /tmp/$tool.zip
  fi
done
grep -q '.local/bin' ~/.zshrc 2>/dev/null || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
echo "✓ $(ffmpeg -version | head -1 | cut -d' ' -f1-3)"

echo "→ HyperFrames skills"
npx --yes skills add heygen-com/hyperframes

cat <<'MSG'

✓ Setup done. In Claude Code, connect once:
  Flora (voices):   claude plugin marketplace add florafauna-ai/flora-mcp-skills
                    claude plugin install flora-mcp-skills@flora
  Ravenpost (optional, scheduling):
                    claude mcp add --transport http ravenpost https://api.ravenpo.st/mcp
Then restart Claude Code in this folder and ask for a cubrik reel.
MSG
