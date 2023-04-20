import TelegramBot from "node-telegram-bot-api";
import { Proxy, User } from "../../const/type";
import Data from "../../data/data";


const handlerList = async (bot: TelegramBot, data: Data, chat: TelegramBot.Chat, contents: string[]): Promise<void> => {
    if (!contents.length) {
        bot.sendMessage(chat.id, `Error args for command "/list"`);
        return;
    }
    const key = contents[0];

    switch (key) {
        case 'proxy':
            {
                const proxys = await data.all<Proxy>(`SELECT * FROM 'proxy';`);
                const msg: string[] = proxys.map(proxy => `Url: ${proxy.url}, Permission: ${proxy.permission}`);
                bot.sendMessage(chat.id, msg.join('\n'));
            }
            break;
        case 'user':
            {
                const users = await data.all<User>(`SELECT * FROM 'user';`);
                const msg = users.map(user => `Username: ${user.username}, Permission: ${user.permission}`);
                bot.sendMessage(chat.id, msg.join('\n'));
            }
            break;
        default:
            break;
    }
}

export default handlerList;