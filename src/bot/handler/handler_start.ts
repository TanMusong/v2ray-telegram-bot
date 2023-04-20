import TelegramBot from "node-telegram-bot-api";
import { User } from "../../const/type";


const handlerStart = (bot: TelegramBot, user: User, chat: TelegramBot.Chat): void => {
    const name = `${chat.first_name ? chat.first_name : ''}${chat.last_name ? (' ' + chat.last_name) : ''}`;
    bot.sendMessage(chat.id, `Welcome ${name}\nPermission: ${!!user.permission}`);
}

export default handlerStart;