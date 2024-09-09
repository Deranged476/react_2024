FROM node:18.20.4-alpine
COPY . ./
RUN npm install --prefix ./backend/
RUN npm install --prefix ./frontend/
RUN npm run build --prefix ./frontend/
EXPOSE 3000
CMD ["npm", "start", "--prefix", "./backend/" ]