
# Step 1: Base image
FROM node:18-alpine AS base
WORKDIR /src
COPY package*.json ./

# Step 2: Install dependencies
FROM base AS deps
RUN npm install --legacy-peer-deps

# Step 3: Build app
FROM base AS builder
COPY --from=deps /src/node_modules ./node_modules
COPY . .
RUN npm run build

# Step 4: Production image
FROM node:18-alpine AS production
WORKDIR /src    

ENV NODE_ENV production

# Only copy required files
COPY --from=builder /src/public ./public
COPY --from=builder /src/.next ./.next
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json ./package.json


EXPOSE 3000
CMD ["npm", "start"]
