FROM node:19.4

WORKDIR /app

COPY package.json /app

RUN npm install --legacy-peer-deps

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]