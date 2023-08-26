FROM node

WORKDIR /usr/src/

COPY . /usr/src/

EXPOSE ${PORT}

RUN npm i

RUN npm run build

CMD ["npm","start"]
