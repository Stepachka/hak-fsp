FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 443

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

CMD ["NODE_ENV=production", "node", "dist/main"]