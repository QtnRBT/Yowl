FROM node:16
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 8080
EXPOSE ${PORT}
CMD ["npm", "run", "serve"]