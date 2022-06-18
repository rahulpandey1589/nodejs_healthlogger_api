FROM  node:alpine

LABEL author="Rahul Pandey"
ENV NODE_ENV=production


WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
EXPOSE  $PORT
ENTRYPOINT [ "npm","start" ]
