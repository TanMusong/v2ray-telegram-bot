
namespace Log {

    export namespace Style {

        export const Reset = '\x1B[0m';

        export enum Color {
            Reset = '\x1B[0m',
            Bright = '\x1B[1m',
            Grey = '\x1B[2m',
            Italic = '\x1B[3m',
            Underline = '\x1B[4m',
            Reverse = '\x1B[7m',
            Hidden = '\x1B[8m',
            Black = '\x1B[30m',
            Red = '\x1B[31m',
            Green = '\x1B[32m',
            Yellow = '\x1B[33m',
            Blue = '\x1B[34m',
            Magenta = '\x1B[35m',
            Cyan = '\x1B[36m',
            White = '\x1B[37m',
        }
        export enum Background {
            Black = '\x1B[40m',
            Red = '\x1B[41m',
            Green = '\x1B[42m',
            Yellow = '\x1B[43m',
            Blue = '\x1B[44m',
            Magenta = '\x1B[45m',
            Cyan = '\x1B[46m',
            Qhite = '\x1B[47m'
        }
    }

    export const info = (tag: string, color: Style.Color | Style.Background | (Style.Color | Style.Background)[], ...text: string[]): void => {
        const style = Array.isArray(color) ? color.join('') : color;
        console.log(`[${style}${tag}${Style.Reset}]${text.join(' ')}`);
    }
}

export default Log;