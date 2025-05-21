# 🚀 Feishu Message Action

[中文版本](./README.zh-CN.md)

A lightweight GitHub Action for sending notifications to a [Feishu](https://www.feishu.cn/) group via a custom bot. Supports optional message signing (security verification).

---

## 📦 Features

- ✅ Supports sending messages
- ✅ Feishu webhook URL configuration
- ✅ Supports multiple message types (text, card, etc.)
- ✅ Optional message signature (secure signing)
- ✅ Friendly with CI/CD pipelines

---

## 🚀 Usage

### 1. Add the Action to your workflow

```yaml
- name: Notify Feishu
  uses: xavier/feishu-message-action@v1
  with:
    webhook: ${{ secrets.FEISHU_WEBHOOK }}
    type: ${{ secrets.FEISHU_TYPE }}
    secret: ${{ secrets.FEISHU_SECRET }}
    message: '{"post":{"zh_cn":{"title":"我是一个标题","content":[[{"tag":"text","text":"第一行 :"},{"tag":"at","user_id":"ou_xxxxxx","user_name":"tom"}],[{"tag":"text","text":"第二行:"},{"tag":"at","user_id":"all","user_name":"所有人"}]]}}}'
```

---

## 🛠 Inputs

| Name    | Required | Description                           |
| ------- | -------- | ------------------------------------- |
| webhook | ✅ Yes   | Feishu robot webhook URL              |
| type    | ✅ Yes   | Message type (text, card, etc.)       |
| secret  | ❌ No    | Secret key for signature (if enabled) |
| message | ✅ Yes   | Message content to send               |

---

## 📘 How to Get Feishu Webhook?

1. Go to Feishu group settings → Add Bot
2. Choose "Custom Bot"
3. Set trigger keywords (e.g., `ci`, `notify`)
4. Copy the generated Webhook URL
5. (Optional) Enable signature, save the secret

---

## 🧪 Local Testing (Optional)

Using [`act`](https://github.com/nektos/act) for local testing:

```bash
# Create .secrets file in project root
FEISHU_WEBHOOK=https://open.feishu.cn/open-apis/bot/v2/hook/xxx
FEISHU_TYPE=post
FEISHU_SECRET=your-secret-key

# Then run
act
```
