FROM node:20 AS builder
WORKDIR /app/flipr-fullstack-app

# Copy project
COPY . .

# Build backend (runs frontend prebuild and packages assets into server/public-client/dist)
RUN cd server && npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app/flipr-fullstack-app/server

# Copy backend artifacts and packaged frontend
COPY --from=builder /app/flipr-fullstack-app/server/dist ./dist
COPY --from=builder /app/flipr-fullstack-app/server/public-client ./public-client
COPY --from=builder /app/flipr-fullstack-app/server/package.json ./
COPY --from=builder /app/flipr-fullstack-app/server/package-lock.json ./

# Install production deps only
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

EXPOSE 5000
CMD ["node", "dist/server.js"]
