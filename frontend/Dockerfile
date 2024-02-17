FROM node:16-alpine 
WORKDIR /app

COPY . .

RUN npm ci 
RUN npm run build
# run npm start

ENV NODE_ENV production

CMD [ "npx", "serve", "build" ]