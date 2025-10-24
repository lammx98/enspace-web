# ============================
# Stage 1: deps (production only)
# ============================
FROM node:22-alpine AS deps
WORKDIR /app

# Chỉ copy file lock để giữ cache tốt
COPY package.json yarn.lock* pnpm-lock.yaml* package-lock.json* ./

# Cài dependencies (chưa có source)
RUN yarn install --frozen-lockfile --production=false

# ============================
# Stage 2: builder
# ============================
FROM node:22-alpine AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN yarn build && rm -rf .next/cache

# ============================
# Stage 3: runner
# ============================
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy minimal files
COPY package.json yarn.lock ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.* ./

# Cài chỉ production deps (fresh)
RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline && yarn cache clean && rm -rf /root/.cache /usr/local/share/.cache /tmp/*

EXPOSE 3000
CMD ["yarn", "start"]
