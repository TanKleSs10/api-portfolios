FROM node:22.14.0-alpine AS dev

WORKDIR /app

COPY package.json .

RUN npm install

# Instalar Git
RUN apk update && apk add --no-cache git

COPY . .

CMD ["npm", "run", "dev"]