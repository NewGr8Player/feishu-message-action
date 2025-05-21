# 🚀 飞书消息通知器 GitHub Action

一个轻量级的 GitHub Action，用于通过飞书自定义机器人发送构建通知，支持可选的消息签名校验（安全验证）。

---

## 📦 功能特性

- ✅ 支持发送消息
- ✅ 支持配置飞书 Webhook 地址
- ✅ 支持可选的签名校验功能
- ✅ 支持消息类型选择
- ✅ 可无缝集成到 CI/CD 流水线

---

## 🚀 使用方法

### 1. 在 GitHub 工作流中添加此 Action

```yaml
- name: Notify Feishu
  uses: xavier/feishu-message-action@v1
  with:
    webhook: ${{ secrets.FEISHU_WEBHOOK }}
    type: ${{ secrets.FEISHU_TYPE }}
    secret: ${{ secrets.FEISHU_SECRET }}
    message: '{"msg_type":"post","content":{"post":{"zh_cn":{"title":"我是一个标题","content":[[{"tag":"text","text":"第一行 :"},{"tag":"at","user_id":"ou_xxxxxx","user_name":"tom"}],[{"tag":"text","text":"第二行:"},{"tag":"at","user_id":"all","user_name":"所有人"}]]}}}}'
```

---

## 🛠 输入参数说明

| 名称      | 是否必填 | 描述               |
|---------| -------- |------------------|
| webhook | ✅ 必填  | 飞书机器人的 Webhook 地址 |
| type    | ✅ 必填  | 用于选择消息类型        |
| secret  | ❌ 可选  | 用于签名校验的密钥（可选）      |
| message | ✅ 必填  | 要发送的文本消息内容       |

---

## 📘 如何获取飞书 Webhook？

1. 在飞书群聊中点击右上角「群设置」
2. 添加「自定义机器人」
3. 设置关键词（如：ci、通知等）
4. 复制生成的 Webhook 地址
5. （可选）启用签名校验，并保存 Secret Key

---

## 🧪 本地测试（可选）

使用 [`act`](https://github.com/nektos/act) 工具进行本地调试：

```bash
# 项目根目录创建 .secrets 文件
FEISHU_WEBHOOK=https://open.feishu.cn/open-apis/bot/v2/hook/xxx
FEISHU_TYPE=text
FEISHU_SECRET=your-secret-key

# 执行测试
act
```
