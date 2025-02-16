FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 9000

CMD ["node", "dist/apps/y-system-server/server.js"]
