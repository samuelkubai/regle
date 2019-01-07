FROM node:carbon

ENV TERM=xterm-256color

WORKDIR /usr/app

# In order to allow this command to use the cache if
# the package.json file has not changed
RUN apt-get update && apt-get -y upgrade && \
    npm install -g yarn@1.12.x && rm -rf package-lock.json

COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install
