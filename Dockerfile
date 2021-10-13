FROM node
COPY . /api
WORKDIR /api
RUN npm install
EXPOSE 8000
CMD npm start