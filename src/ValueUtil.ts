export namespace ValueUtil {

    /**
     * Format With %d,%s or {0},{1}
     * @param str 
     * @param values 
     */
    export function formatString(str: string, ...values: any[]): string {
        if (!str) return '';
        if (values.length <= 0) return str;
        if (values.length === 1 && Array.isArray(values[0])) values = values[0];
        if (/(%d)|(%s)/.test(str))
            values.forEach(value => {
                const regExpToTest = typeof value === 'number' ? /%d/ : /%s/;
                str = regExpToTest.test(str) ? str.replace(regExpToTest, value) : `${str} ${value}`
            })
        else if (/\{0\}/.test(str))
            str = str.replace(/\{(\d+)\}/g, (substr, index) => values[index] || substr);
        else
            str += ` ${values.join()}`
        return str;
    }

    export function zerofill(value: number, length: number): string {
        const source = value.toString();
        const sourceLength = source.length;
        if (sourceLength >= length) return source;
        let out = source, count = length - sourceLength;
        while (count-- > 0) out = `0${out}`
        return out;
    }

    export function elliptic(str: string, length: number): string {
        if (!str) return "";
        else if (str.length <= length) return str;
        else return str.substring(0, length - 1) + "…";
    }
}