FROM mhart/alpine-node
MAINTAINER Sven Hecht "sven@fablab-karlsruhe.de"

WORKDIR /src

RUN npm install -g forever

ADD package.json package.json
RUN npm install

RUN mkdir /logs

ADD . .

EXPOSE 3000

CMD forever --minUptime 1000 --spinSleepTime 1000 -l /logs/server.log -o /logs/out.log -e /logs/err.log app.js