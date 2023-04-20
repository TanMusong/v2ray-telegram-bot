import TelegramBot from "node-telegram-bot-api";
import { User } from "../../const/type";
import Subscribe from "../../subscribe/subscribe";
import Data from "../../data/data";


const handlerAdd = (bot: TelegramBot, data: Data, user: User, chat: TelegramBot.Chat, contents: string[]): void => {
    if (!contents.length) {
        bot.sendMessage(chat.id, `Error args for command "/update"`);
        return;
    }
    const key = contents.shift();
    switch (key) {
        case 'proxy':
            break;
        case 'user':
            break;
    }
}

export default handlerAdd;