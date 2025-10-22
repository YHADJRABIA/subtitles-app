# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

# Install OS dependencies required by next.js and sharp
RUN apk add --no-cache libc6-compat python3 make g++

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# Rebuild sharp against Alpine libc if required
RUN npm rebuild sharp

FROM base AS builder

COPY . .

# Build the Next.js application
RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Install production dependencies only
COPY --from=base /app/node_modules ./node_modules

# Copy necessary files from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-env.d.ts ./next-env.d.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

ENV NODE_ENV=production
ENV PORT=3000

# Add a non-root user to run the app
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
