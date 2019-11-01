import { NextFunction, Request, Response, Router } from 'express';

const NAME_TO_COLOR = {
    'YOON_D_GRAM_FRONT': '#FF1111',
    'YOON_D_GRAM_BACK': '#11AA11',
    'YOON_D_GRAM_HOOK': '#1111AA'
}

export default class GitHook {
    public static buildEnd(request: Request): any {
        const payload: any = JSON.parse(request.body.payload);

        return {
            attachments: [
                {
                    fields: [
                        {
                            title: "Repository",
                            value: `${payload.repository.name}`,
                            short: true
                        },
                        {
                            title: "Status",
                            value: "Done",
                            short: true
                        }
                    ],
                    color: NAME_TO_COLOR[payload.repository.name] ? NAME_TO_COLOR[payload.repository.name] : '#2eb886',
                    footer: "Build Bot",
                    footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
                    ts: Math.round(Date.now() / 1000)
                }
            ]
        };
    }

    public static buildStart(request: Request): any {
        const payload: any = JSON.parse(request.body.payload);

        return {
            attachments: [
                {
                    fields: [
                        {
                            title: "Repository",
                            value: `${payload.repository.name}`,
                            short: true
                        },
                        {
                            title: "Status",
                            value: "Building",
                            short: true
                        }
                    ],
                    color: NAME_TO_COLOR[payload.repository.name] ? NAME_TO_COLOR[payload.repository.name] : '#2eb886',
                    footer: "Build Bot",
                    footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
                    ts: Math.round(Date.now() / 1000)
                }
            ]
        };
    }

    public static log(request: Request): any {
        const payload: any = JSON.parse(request.body.payload);
        const head: any = payload.head_commit;

        return {
            attachments: [
                {
                    color: NAME_TO_COLOR[payload.repository.name] ? NAME_TO_COLOR[payload.repository.name] : '#2eb886',
                    author_name: `${payload.repository.name}`,
                    author_link: `${payload.repository.html_url}`,
                    title: `${head ? head.message : ''}`,
                    title_link: `${head.url}`,
                    text: `${head ? head.committer.name : ''} (${head ? head.committer.email : ''})`,
                    footer: "Build Bot",
                    footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
                    ts: Math.round(Date.now() / 1000)
                }
            ]
        };
    }
}