import { NextFunction, Request, Response, Router } from 'express';
import * as exec from 'child_process';
import SlackBot from '../slack/SlackBot';
import GitHook from '../slack/GitHook';

export default class WebHookController {
    constructor() {
    }

    public async hook(request: Request): Promise<void> {
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/HookBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/HookReload.sh'], { stdio: 'inherit' });
    }

    public async front(request: Request): Promise<void> {
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/FrontBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/FrontReload.sh'], { stdio: 'inherit' });
    }

    public async back(request: Request): Promise<void> {
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/BackBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/BackReload.sh'], { stdio: 'inherit' });
    }

    public async socket(request: Request): Promise<void> {
        await SlackBot.sendMessage(GitHook.log(request));
        await SlackBot.sendMessage(GitHook.buildStart(request));
        await exec.spawnSync('sh', ['shell/SocketBuild.sh'], { stdio: 'inherit' });
        await SlackBot.sendMessage(GitHook.buildEnd(request));
        await exec.spawnSync('sh', ['shell/SocketReload.sh'], { stdio: 'inherit' });
    }
}