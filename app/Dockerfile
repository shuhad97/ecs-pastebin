FROM node:21

WORKDIR /app

COPY . .

ENV DATABASE_URL=$DATABASE_URL
ENV ADMIN_PASSWORD=""

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]