import fs from 'fs';
import path from 'path';

namespace File {

    export const copy = (srcFileOrDir: string, destFileOrDir: string): void => {
        if (!fs.existsSync(srcFileOrDir)) return;
        const stat = fs.statSync(srcFileOrDir);
        if (stat.isDirectory()) {
            mkdir(destFileOrDir);
            const files = fs.readdirSync(srcFileOrDir);
            files.forEach(item => copy(path.join(srcFileOrDir, item), path.join(destFileOrDir, item)));
        } else {
            mkdir(path.dirname(destFileOrDir));
            fs.copyFileSync(srcFileOrDir, destFileOrDir);
        }
    }

    export const mkdir = (dir: string): void => {
        if (fs.existsSync(dir)) return;
        let parentDir = path.dirname(dir);
        mkdir(parentDir);
        fs.mkdirSync(dir);

    }

    export const rm = (fileOrDir: string): void => {
        if (!fs.existsSync(fileOrDir)) return;
        const stat = fs.statSync(fileOrDir);
        if (stat.isDirectory()) {
            const files = fs.readdirSync(fileOrDir);
            files.forEach(item => rm(path.join(fileOrDir, item)));
            fs.rmdirSync(fileOrDir);
        } else {
            fs.unlinkSync(fileOrDir);
        }

    }

    export const writeString = (filePath: string, content: string): void => {
        mkdir(path.dirname(filePath));
        fs.writeFileSync(filePath, content);
    }

    export const readString = (filePath: string): string | undefined => {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath)
            return data ? data.toString() : undefined;
        } else {
            return undefined;
        }
    }

}

export default File;