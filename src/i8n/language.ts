import Const from '../const/const';
import File from '../utils/file';
import path from 'path';

namespace Language {

    let data: { [key: string]: string } | undefined = undefined;
    let language: string | undefined = undefined;

    export const set = (lang: string): void => {
        if (lang === language) return;
        const content = File.readString(path.join('..', '..', 'i18n', `${language}.json`));
        if (!content) return;
        data = JSON.parse(content);
        language = lang;
    }

    export const getText = (key: string): string => {
        if (!data) set(Const.DEFAULT_LANGUAGE);
        if (!data || !data[key]) return `[text:${key}]`;
        return data[key];
    }
}

export default Language;