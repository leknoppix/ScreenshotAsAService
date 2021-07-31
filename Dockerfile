FROM node

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 8888

CMD [ "npm", "run", "start" ]