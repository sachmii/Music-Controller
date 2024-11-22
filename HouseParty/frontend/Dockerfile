FROM node:16

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install 

COPY . .

RUN npm run build  # Build production-ready files

RUN npm install -g serve
CMD serve -s build 

EXPOSE 3000
