import axios from 'axios';
import { SLACK_CONFIG } from '../../config/Slack';

export interface SlackMessage {
    text: string,
}

export default class SlackBot {
    public static async sendMessage(options: SlackMessage): Promise<void> {
        await axios.post(SLACK_CONFIG.url, options, { headers: { 'Content-type': 'application/json' } });
    }
}