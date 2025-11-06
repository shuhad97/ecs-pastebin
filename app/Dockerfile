FROM node:21

WORKDIR /app

COPY . .

ENV PORT=80

RUN npm install

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview"]