# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./


RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

# # Stage 2: Create the runtime image
FROM node:22-alpine AS runtime

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 80

CMD [ "npm", "run", "start:prod" ]