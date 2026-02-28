FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies only
FROM base AS deps
COPY package.json bun.lock .npmrc ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production dependencies only
FROM base AS prod-deps
COPY package.json bun.lock .npmrc ./
RUN bun install --frozen-lockfile --production

# Runtime
FROM base AS runtime
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

ENV NODE_ENV=production
ENV PORT=3000

USER bun
EXPOSE 3000

CMD ["bun", "build/index.js"]
