FROM node:18-alpine
WORKDIR /app
COPY app/package.json ./
RUN npm install --production
COPY app/server.js ./
COPY app/test.js ./
COPY app/public ./public
EXPOSE 3000
CMD ["node", "start"]
