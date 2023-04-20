import TelegramBot from "node-telegram-bot-api";
import Language from "../i8n/language";
import handlerUpdate from "./handler/handler_add";
import handlerUrl from "./handler/handler_url";
import Log from "../utils/log";
import Data from "../data/data";
import handlerStart from "./handler/handler_start";
import { User } from "../const/type";
import handlerList from "./handler/handler_list";

export default class Bot {

    private root: string;
    private bot: TelegramBot;
    private data: Data;

    constructor(token: string, root: string, data: Data) {
        this.root = root;
        this.data = data;
        this.bot = new TelegramBot(token, { polling: true });
        this.bot.on('message', msg => this.onBotMessage(msg));
    }

    private async onBotMessage(msg: TelegramBot.Message): Promise<void> {
        const chat = msg.chat;
        const chatId = chat.id;
        const username = chat.username;
        if (!username) return;


        let user: User | undefined = await this.data.get(`SELECT * FROM 'user' WHERE username = '${username}';`);
        if (!user) {
            if (username !== this.root) {
                this.bot.sendMessage(chatId, Language.getText('permission_denied'));
                return;
            } else {
                user = { username, permission: 100 }
                this.data.run(`INSERT INTO user VALUES ('${user.username}', ${user.permission});`)
            }
        }
        const text = msg.text;
        if (!text) return;
        const contents = text.split(' ');
        const command = contents.shift();
        Log.info(this.constructor.name, Log.Style.Color.Bright, '');
        switch (command) {
            case '/start':
                handlerStart(this.bot, user, chat);
                break;
            case '/list':
                handlerList(this.bot, this.data, chat, contents);
                break;
            case '/add':
                handlerUpdate(this.bot, this.data, user, chat, contents);
                break;
            case '/url':
                handlerUrl(this.bot, this.data, user, chat, contents);
                break;
        }
    }
}