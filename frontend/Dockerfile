FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . ./
EXPOSE 3001
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD ["npm", "start"]
