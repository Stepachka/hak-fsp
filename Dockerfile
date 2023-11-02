FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist
# Установите переменную окружения для порта
ENV PORT=8080

# Откройте порт, на котором будет работать приложение
EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]