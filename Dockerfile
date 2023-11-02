FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

RUN npm run build

CMD ["node", "dist/main"]