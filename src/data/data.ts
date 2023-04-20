import sqlite3 from 'sqlite3';
import path from 'path'
import Const from '../const/const';

export default class Data {

    private database!: sqlite3.Database;

    constructor() {
    }

    public open(): Promise<void> {
        const promise: Promise<void> = new Promise((resolve, reject) => {
            if (this.database) {
                resolve();
                return;
            }
            const db = new sqlite3.Database(
                path.join(Const.DATA_PATH, 'data.db'),
                error => {
                    if (error) {
                        db.close();
                        reject(error);
                    } else {
                        this.database = db;
                        resolve();
                    }
                });
        })
        return promise;
    }

    public run(sql: string): Promise<void> {
        const promise: Promise<void> = new Promise((resolve, reject) =>
            this.database.run(sql, (error) => error ? reject(error) : resolve())
        );
        return promise;
    }

    public get<T>(sql: string): Promise<T> {
        const promise: Promise<T> = new Promise((resolve, reject) =>
            this.database.get<T>(sql, (error, row) => error ? reject(error) : resolve(row))
        );
        return promise;
    }

    public all<T>(sql: string): Promise<T[]> {
        const promise: Promise<T[]> = new Promise((resolve, reject) =>
            this.database.all<T>(sql, (error, rows) => error ? reject(error) : resolve(rows))
        );
        return promise;
    }
}

