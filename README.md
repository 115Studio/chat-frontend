# 115 Chat — full sync, free forever
![115-chat-showcase](https://github.com/user-attachments/assets/f2c3cd47-084a-4530-a17d-fb84d0b28edd)

## Features
- Real-time sync of chats & inputs including uploaded images between all devices
- Resumable streams
- Mobile support
- Local-first & optimistic updates
- Images & files support
- Image generation
- Reasoning..kind of
- Effort control
- Syntax highlighting & markdown
- Retry message
- Pin/Rename/Delete chats 
- Serverless =)

## Features ready only on the backend, as of 18 Jun 2025
- Bring your own key
- Web search
- Personalities (system prompt selection for every request)
- Edit user's message

## Features that we didn't have time for
- Abort the generation
- Chat sharing
- Chat branching 
- Audio messages

# Deploying
## Before you begin...
You'll need a discord bot to authenticate users. Create one [here](https://discord.dev).
<img width="792" alt="image" src="https://github.com/user-attachments/assets/2a4491f2-b134-4099-a566-a9747b940e12" />

## Deploy
### Backend
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/115Studio/chat-backend/tree/main)

<img width="792" alt="image" src="https://github.com/user-attachments/assets/46ac75f4-ba08-4930-8114-c69c3464b94c" />

- **Google AI API key is required.**
- <a href="https://dash.cloudflare.com/?to=/:account/workers/services/view/chat-backend/production/settings" target="_blank">Env settings</a> (if you left the default name, else [find them yourself](https://dash.cloudflare.com/?to=/:account/workers-and-pages))
- Env [example](https://github.com/115Studio/chat-backend/blob/main/.example.vars)

### Frontend
#### First, fork the frontend repository: [chat-frontend](https://github.com/115Studio/chat-frontend/fork)
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/pages/new/provider/github)

<img width="792" alt="image" src="https://github.com/user-attachments/assets/6d7ba9f7-0d1e-4573-91dd-07368eefe036" />

#### That's it.

## Dev
In development, you simply copy the repository to your local machine, install the packages, and write `npm run dev`. For the backend, before that, you also need to run `npm run migrate`.

### Backend
```bash
git clone https://github.com/115Studio/chat-backend 115-chat-backend
```
```bash
cd 115-chat-backend
```
```bash
npm ci
```
```bash
npm run migrate:dev
```
```bash
npm run dev
```

### Frontend
```bash
git clone https://github.com/115Studio/chat-frontend 115-chat-frontend
```
```bash
cd 115-chat-frontend
```
```bash
npm ci
```
```bash
npm run dev
```
