import TelegramBot from "node-telegram-bot-api";
import Subscribe from "../subscribe/subscribe";

export default class Bot {

    private root: string;
    private bot: TelegramBot;
    private updating: string[] | null = null;

    constructor(token: string, root: string) {
        this.root = root;
        this.bot = new TelegramBot(token, { polling: true });
        this.bot.on('message', msg => this.onBotMessage(msg));
    }

    private onBotMessage(msg: TelegramBot.Message): void {
        const chatId = msg.chat.id;
        const username = msg.chat.username;
        if (username !== this.root) {
            this.bot.sendMessage(chatId, 'Permission denied.');
            return;
        }
        const text = msg.text;
        if (!text) return;
        if (this.updating) {
            this.updating[1] = this.updating[1] + text;
            return;
        };
        const data = text.split(' ');
        const command = data.shift();
        switch (command) {
            case '/start':
                break;
            // case '/list':
            //     this.bot.sendMessage(chatId, `Error args for command "/update"`, { reply_markup: { keyboard: [[{ text: 'test1' }]], resize_keyboard: true } });
            //     break;
            case '/update_start':
                this.updating = [data[0], data[1] || ''];
                break;
            case '/update_finish':
                this.updating && this.handlerUpdate(this.updating, chatId);
                this.updating = null;
                break;
            case '/update':
                this.handlerUpdate(data, chatId);
                break;
            case '/url':
                this.handlerUrl(data, chatId);
                break;
            default:
                this.bot.sendMessage(chatId, 'Undefined command.');
                break;
        }
    }

    private handlerUpdate(data: string[], chatId: TelegramBot.ChatId): void {
        if (data.length !== 2) {
            this.bot.sendMessage(chatId, `Error args for command "/update"`);
            return;
        }
        const [key, content] = data;
        Subscribe.update(key, content);
        this.bot.sendMessage(chatId, `Config "${key}" updated`);
    }

    private handlerUrl(data: string[], chatId: TelegramBot.ChatId): void {
        if (data.length !== 1) {
            this.bot.sendMessage(chatId, `Error args for command "/url"`);
            return;
        }
        const key = data[0];
        this.bot.sendMessage(chatId, `Config "${key}" url: \n${Subscribe.key2url(key)}`);

    }
}