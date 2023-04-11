import Bot from "./bot";
import Http from "./http";
import File from "./file";




const main = () => {

    const configString = File.readString('/etc/v2ray-telegram-bot/config.json');
    if (!configString) {
        throw new Error();
    }

    const config = JSON.parse(configString);

    new Bot(config.token, config.root);

    const http = new Http(config.port, config.key, config.cert);
    http.start();

}

main();
