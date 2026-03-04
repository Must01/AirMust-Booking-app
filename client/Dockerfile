# Stage 1: Build
FROM node:20 AS builder
WORKDIR /app
# layer 1
COPY package.json ./
RUN npm install
#layer 2
COPY index.html ./
COPY vite.config.js ./
COPY createContext.jsx ./
COPY src ./src
COPY tailwind.config.js ./
COPY postcss.config.js ./
RUN npm run build


# Stage 2: Serve
FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf