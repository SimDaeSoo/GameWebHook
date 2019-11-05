import { NextFunction, Request, Response, Router } from 'express';
import WebHookController from '../controller/WebHookController';

export default class WebHookAPI {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private async routes(): Promise<void> {
        this.router.post('/hook', this.hook);
        this.router.post('/front', this.front);
        this.router.post('/back', this.back);
        this.router.post('/socket', this.socket);
        this.router.post('/kakao', this.kakao);
    }

    private async kakao(request: Request, response: Response, next: NextFunction): Promise<void> {
        const webHookController = new WebHookController();
        webHookController.kakao(request);
        response.send();
    }

    private async hook(request: Request, response: Response, next: NextFunction): Promise<void> {
        const webHookController = new WebHookController();
        webHookController.hook(request);
        response.send();
    }

    private async front(request: Request, response: Response, next: NextFunction): Promise<void> {
        const webHookController = new WebHookController();
        webHookController.front(request);
        response.send();
    }

    private async back(request: Request, response: Response, next: NextFunction): Promise<void> {
        const webHookController = new WebHookController();
        webHookController.back(request);
        response.send();
    }

    private async socket(request: Request, response: Response, next: NextFunction): Promise<void> {
        const webHookController = new WebHookController();
        webHookController.socket(request);
        response.send();
    }
}