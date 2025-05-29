FROM node:lts AS build

WORKDIR /app
COPY package*.json .
RUN npm i -f
COPY . .
RUN npm run build

FROM nginx:stable-perl

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist/dev-tools-studio/browser .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]