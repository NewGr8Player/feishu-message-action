import * as core from '@actions/core'
import got from 'got'
import crypto from 'crypto'

async function run(): Promise<void> {
    try {
        const webhook = core.getInput('webhook');
        const secret = core.getInput('secret');
        const type = core.getInput('type');
        const message = core.getInput('message');

        const timestamp = Math.floor(Date.now() / 1000);
        let sign = '';

        if (secret) {
            sign = genSign(secret, timestamp);
        }

        const body: {
            msg_type: string
            content?: Object
            card?: Object
            timestamp?: number
            sign?: string
        } = {
            msg_type: type
        }

        if ("interactive" === type){
            body.card = JSON.parse(message)
        } else {
            body.content = JSON.parse(message)
        }

        if (secret) {
            body.timestamp = timestamp
            body.sign = sign
        }

        const response = await got.post(webhook, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        core.info(`Feishu message sent. Status: ${response.statusCode}`)
        core.info(`Response: ${response.body}`)
    } catch (error: unknown) {
        if (error instanceof Error) {
            core.setFailed(`Failed to send message: ${error.message}`)
        } else {
            core.setFailed('Unknown error occurred')
        }
    }
}

/**
 * Generate sign for Feishu message
 *
 * @param secret secret
 * @param timestamp timestamp in seconds
 * @returns sign for Feishu message
 */
function genSign(secret: string, timestamp: number): string {
    const stringToSign = `${timestamp}\n${secret}`
    const hmac = crypto.createHmac('sha256', stringToSign)
    const signData = hmac.update(Buffer.from([])).digest()
    return signData.toString('base64')
}

run()