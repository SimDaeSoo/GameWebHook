import { NextFunction, Request, Response, Router } from 'express';
import * as exec from 'child_process';
import SlackBot from '../slack/SlackBot';
import GitHook from '../slack/GitHook';

const enum BRANCH_TYPE {
    MASTER = 'refs/heads/master',
    DEVELOPMENT = 'refs/heads/dev',
    ETC = ''
};
export default class WebHookController {
    constructor() {
    }

    public async hook(request: Request): Promise<void> {
        if (this.getBranchType(request) !== BRANCH_TYPE.MASTER) return;
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/HookBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/HookReload.sh'], { stdio: 'inherit' });
    }

    public async front(request: Request): Promise<void> {
        if (this.getBranchType(request) !== BRANCH_TYPE.MASTER) return;
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/FrontBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/FrontReload.sh'], { stdio: 'inherit' });
    }

    public async back(request: Request): Promise<void> {
        if (this.getBranchType(request) !== BRANCH_TYPE.MASTER) return;
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/BackBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/BackReload.sh'], { stdio: 'inherit' });
    }

    public async socket(request: Request): Promise<void> {
        if (this.getBranchType(request) !== BRANCH_TYPE.MASTER) return;
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/SocketBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/SocketReload.sh'], { stdio: 'inherit' });
    }

    public async kakao(request: Request): Promise<void> {
        if (this.getBranchType(request) !== BRANCH_TYPE.MASTER) return;
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/KakaoBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/KakaoReload.sh'], { stdio: 'inherit' });
    }

    private getBranchType(request: Request): BRANCH_TYPE {
        const payload: any = JSON.parse(request.body.payload);
        console.log(request.body.payload);
        console.log(request.body.payload === BRANCH_TYPE.MASTER);
        if (payload && payload.ref === BRANCH_TYPE.MASTER) {
            return BRANCH_TYPE.MASTER;
        } else if (payload && payload.ref === BRANCH_TYPE.MASTER) {
            return BRANCH_TYPE.DEVELOPMENT;
        } else {
            return BRANCH_TYPE.ETC;
        }
    }
}