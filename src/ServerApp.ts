import { NextFunction, Request, Response, Application } from 'express';
import WebHookAPI from './routers/WebHookAPI';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

class ServerApp {
    public express: Application;
    public server: http.Server;
    public port: string | number | boolean;

    constructor() {
        this.express = express();
    }

    public async initialize(): Promise<void> {
        this.middleware();
        this.setNormalizePort(7000);
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false, limit: '10mb', parameterLimit: 1000000 }));

        this.express.all('*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
            res.header('Access-Control-Allow-Methods', 'POST,GET');
            next();
        });
    }

    private setNormalizePort(port: number): void {
        this.port = this.normalizePort(port);
    }

    private normalizePort(val: number | string): number | string | boolean {
        const normalizedPort: number = (typeof val === "string") ? parseInt(val, 10) : val;
        if (isNaN(normalizedPort)) {
            return val;
        } else if (normalizedPort >= 0) {
            return normalizedPort;
        } else {
            return false;
        }
    }

    private routes(): void {
        const webhook: WebHookAPI = new WebHookAPI();
        this.express.use('/webhook', webhook.router);
    }

    public createServer(): void {
        this.express.set('port', this.port);
        this.server = http.createServer(this.express);
        this.server.listen(this.port);
    }
}
export default ServerApp;