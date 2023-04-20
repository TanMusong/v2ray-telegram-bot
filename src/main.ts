import Bot from "./bot/bot";
import Const from "./const/const";
import Data from "./data/data";
import Http from "./server/http";
import File from "./utils/file";

const main = async () => {

    const configString = File.readString(Const.CONFIG_PATH);
    if (!configString) {
        throw new Error('config file not found');
    }

    const config = JSON.parse(configString);

    const data = new Data();
    await data.open();

    await data.run(`CREATE TABLE IF NOT EXISTS 'user'( 'username' TEXT NOT NULL, 'permission' INTEGER DEFAULT 0);`);
    await data.run(`CREATE TABLE IF NOT EXISTS 'proxy'( 'url' TEXT NOT NULL, 'permission' INTEGER DEFAULT 0);`);

    new Bot(config.token, config.root, data);

    // const http = new Http(config.port, config.key, config.cert);
    // http.start();

}

main();
