# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# 2. Run Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]

# 1. Build Stage FROM node:20-alpine AS builder WORKDIR /app COPY package*.json ./ RUN npm install --frozen-lockfile COPY . . RUN npm run build # 2. Run Stage FROM node:20-alpine AS runner WORKDIR /app ENV NODE_ENV=production COPY --from=builder /app/package*.json ./ RUN npm install --omit=dev --ignore-scripts COPY --from=builder /app/.next ./.next COPY --from=builder /app/public ./public EXPOSE 3000 CMD ["npm", "start"]