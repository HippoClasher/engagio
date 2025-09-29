# Plattform explizit auf amd64 (kompatibel mit NAS und Apple Silicon)
FROM --platform=linux/amd64 node:20-bullseye

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nur package.json und package-lock.json kopieren
COPY package*.json ./

# Saubere Installation der Dependencies
RUN npm ci

# Rest des Projekts kopieren
COPY . .

# Next.js Build
RUN npm run build

# Port freigeben (Standard: 3000)
EXPOSE 3000

# Startbefehl
CMD ["npm", "start"]
