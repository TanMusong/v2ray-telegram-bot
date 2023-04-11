from node:16
COPY ./ /usr/local/v2ray-telegram-bot
WORKDIR /usr/local/v2ray-telegram-bot
RUN npm i \
    && ./node_modules/.bin/tsc -p ./tsconfig.json
CMD node src/main

