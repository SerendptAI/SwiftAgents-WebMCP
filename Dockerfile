FROM node:22-slim

WORKDIR /app

# Copy manifests first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application and build the React bundle
COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 8001

CMD ["npm", "start"]
