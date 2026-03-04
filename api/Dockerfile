FROM node:20
WORKDIR /app

# layer 1
COPY package.json ./ 
RUN npm install
# layer 2
COPY . .
EXPOSE 3000
CMD ["npm", "start"]