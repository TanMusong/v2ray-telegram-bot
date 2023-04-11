import http from 'http';
import https from 'https';
import url from 'url';
import fs from 'fs';

import Subscribe from '../subscribe/subscribe';

export default class Http {
    private port: number;
    private key?: string;
    private cert?: string;

    constructor(port: number, key?: string, cert?: string) {
        if (port <= 0 || port >= 65536) throw new Error();
        this.port = port;
        this.key = key;
        this.cert = cert;
    }

    public start(): void {
        if (this.key && this.cert) {
            const options: https.ServerOptions<typeof http.IncomingMessage, typeof http.ServerResponse> = {
                key: fs.readFileSync(this.key),
                cert: fs.readFileSync(this.cert),
            };
            https.createServer(options, (request, response) => this.requestListener(request, response)).listen(this.port);
        } else {
            http.createServer((request, response) => this.requestListener(request, response)).listen(this.port);
        }
    }

    private requestListener(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage; }): void {

        if (!request || !request.url) {
            response.writeHead(404);
            response.end();
            return;
        }
        const pathname = url.parse(request.url).pathname;
        console.log(pathname);
        if (!pathname || pathname === '/') {
            response.writeHead(404);
            response.end();
            return;
        }
        const key = Subscribe.url2key(pathname);
        if (!key) {
            response.writeHead(404);
            response.end();
            return;
        }
        const data = Subscribe.get(key);
        response.writeHead(200, { 'Content-type': 'text/plain' });
        response.end(Buffer.from(data).toString('base64'));
    }
}


