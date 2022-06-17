FROM  node:alpine

LABEL author="Rahul Pandey"
ENV NODE_ENV=production
ENV PORT=1158
ENV MONGO_URI='mongodb://mongo:27017/health_logger?retryWrites=true&w=majority'

WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
EXPOSE  $PORT
ENTRYPOINT [ "npm","start" ]
