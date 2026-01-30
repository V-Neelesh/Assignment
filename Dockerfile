FROM node:20 AS builder
WORKDIR /app

# Copy project
COPY . .

# Build frontend
RUN cd client-legacy && npm ci && npx tsc && mkdir -p dist/pages dist/css && cp src/pages/*.html dist/pages/ && cp src/css/*.css dist/css/

# Build backend
RUN cd server && npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app/server

# Copy backend artifacts
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package.json ./

# Copy frontend built assets to expected relative path
COPY --from=builder /app/client-legacy/dist ../client-legacy/dist

# Install production deps only
RUN npm ci --omit=dev

EXPOSE 5000
CMD ["node", "dist/server.js"]
