FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json package-lock.json* ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
