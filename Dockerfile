FROM node:16.18.1
WORKDIR /app
COPY ["package*.json", "./"]
RUN echo "NPM: " && npm -v
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]