FROM node:latest

WORKDIR /usr/src/app

RUN git clone https://github.com/Metalloriff/nas-dashboard.git .

RUN npm install

EXPOSE 3000
EXPOSE 3001

# WORKDIR nas-dashboard

# CMD ["npm", "start"]