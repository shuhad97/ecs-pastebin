FROM node:21

WORKDIR /app

COPY . .

ENV DATABASE_URL=$DATABASE_URL
ENV PORT=80

RUN npm install

RUN npm run build

EXPOSE 80

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]