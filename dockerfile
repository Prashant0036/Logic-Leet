FROM node:20-alpine as frontend-builder

COPY ./frontend /app

# copy frontend folder in app folder

WORKDIR /app
# now we did cd app

RUN npm install

RUN npm run build


FROM node:20-alpine as backend-builder

COPY ./backend /app

WORKDIR /app

RUN npm install

COPY --from=frontend-builder /app/dist /app/public

CMD [ "node","src/index.js" ]



