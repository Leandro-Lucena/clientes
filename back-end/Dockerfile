FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
COPY .env ./  
RUN npm install

COPY . .
RUN npm run build

# ==========================
FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY .env ./    
RUN npm install --only=production

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
