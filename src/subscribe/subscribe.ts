import File from "../utils/file";
import path from 'path';
import { v4 } from 'uuid';
import Const from "../const/const";

namespace Subscribe {

    const createUrl = (key: string): string => {
        const url = `/${v4({})}` +
            `/${Date.now()}` +
            `/${Buffer.from(v4()).toString('base64url')}` +
            `/${Buffer.from(key).toString('base64url')}`
        return url;
    }

    export const key2url = (key: string): string => {
        const urlData: { [key: string]: string } = JSON.parse(File.readString(path.join(Const.DATA_PATH, 'url.json')) || '{}');
        if (urlData[key]) return urlData[key];
        const url = createUrl(key);
        urlData[key] = url;
        File.writeString(path.join(Const.DATA_PATH, 'url.json'), JSON.stringify(urlData));
        return url;
    }

    export const url2key = (url: string): string | undefined => {
        const urlData: { [key: string]: string } = JSON.parse(File.readString(path.join(Const.DATA_PATH, 'url.json')) || '{}');

        for (const key in urlData) {
            const item = urlData[key];
            console.log(`${item}\n${url}`)
            if (item === url) return key;
        }
        return undefined;
    }

    export const update = (key: string, content: string): void => {
        File.writeString(path.join(Const.DATA_PATH, `${key}.txt`), content);
    }

    export const get = (key: string): string => {
        return File.readString(path.join(Const.DATA_PATH, `${key}.txt`)) || '';
    }
}

export default Subscribe;