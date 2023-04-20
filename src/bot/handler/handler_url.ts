import TelegramBot from "node-telegram-bot-api";
import Subscribe from "../../subscribe/subscribe";
import Data from "../../data/data";
import { User } from "../../const/type";

const handlerUrl = (bot: TelegramBot, data: Data, user: User, chat: TelegramBot.Chat, contents: string[]): void => {
    if (contents.length !== 1) {
        bot.sendMessage(chat.id, `Error args for command "/url"`);
        return;
    }
    const key = contents[0];
    bot.sendMessage(chat.id, `Config "${key}" url: \n${Subscribe.key2url(key)}`);
}

export default handlerUrl;