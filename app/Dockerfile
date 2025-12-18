FROM node:22-slim AS build

WORKDIR /app

COPY . .

ENV PORT=80

RUN npm install

RUN npm run build

# Add non root user and switch to that user 


FROM node:22-slim AS prod

RUN groupadd -r nonrootgroup && useradd -r -g nonrootgroup nonrootuser
RUN npm install -g serve 

COPY --from=build app/dist /app/

EXPOSE 80

CMD ["serve", "-s", "app", "-l", "80"]
