FROM node:20.10-alpine3.18
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 9000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
