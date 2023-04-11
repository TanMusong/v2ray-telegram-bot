from node:16
COPY ./ /usr/local/v2ray-telegram-bot
WORKDIR /usr/local/v2ray-telegram-bot
RUN npm i \
    && npm i typescript -g \
    && tsc \
CMD node src/main

