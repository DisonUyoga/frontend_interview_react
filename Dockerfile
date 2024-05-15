FROM node:alpine
WORKDIR /app
COPY *.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]