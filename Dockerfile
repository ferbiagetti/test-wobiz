FROM node:12.7-alpine AS builder
RUN npm install -g @angular/cli@10.0.2
WORKDIR /test
ADD ./package.json /test
RUN npm install
ADD . /test
RUN ng build --prod


FROM nginx:alpine

ADD ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /test/dist/test-wobiz-angular /usr/share/nginx/html 
