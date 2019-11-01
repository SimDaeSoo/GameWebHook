import axios from 'axios';

export interface SlackMessage {
    text: string,
}

export default class SlackBot {
    public static async sendMessage(options: SlackMessage): Promise<void> {
        const slackChannel: string = `https://hooks.slack.com/services/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`;
        await axios.post(slackChannel, options, { headers: { 'Content-type': 'application/json' } });
    }
}