
FROM node:20.16.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=dev

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf *

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/auth-project/browser .

#  /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]