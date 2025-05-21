const core = require('@actions/core');
const axios = require('axios');
const crypto = require('crypto');

(async () => {
    try {
        const webhook = core.getInput('webhook');
        const secret = core.getInput('secret');
        const message = core.getInput('message');

        let timestamp = Math.floor(Date.now() / 1000).toString();
        let sign = '';

        if (secret) {
            const stringToSign = `${timestamp}\n${secret}`;
            const hmac = crypto.createHmac('sha256', secret);
            hmac.update(stringToSign);
            sign = hmac.digest('base64');
        }

        const body = {
            msg_type: 'text',
            content: { text: message },
        };

        if (secret) {
            body.timestamp = timestamp;
            body.sign = sign;
        }

        const response = await axios.post(webhook, body, {
            headers: { 'Content-Type': 'application/json' },
        });

        core.info(`Feishu message sent. Status: ${response.status}`);
    } catch (error) {
        core.setFailed(`Failed to send message to Feishu: ${error.message}`);
    }
})();
