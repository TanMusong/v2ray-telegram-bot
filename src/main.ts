import Bot from "./bot/bot";
import Const from "./const/const";
import Http from "./server/http";
import File from "./utils/file";

const main = () => {

    const configString = File.readString(Const.CONFIG_PATH);
    if (!configString) {
        throw new Error();
    }

    const config = JSON.parse(configString);

    new Bot(config.token, config.root);

    const http = new Http(config.port, config.key, config.cert);
    http.start();

}

main();
