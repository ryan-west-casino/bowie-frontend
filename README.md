# Bowie Frontend
Bowie is a simple casino lobby. I've created this to learn more about frontend and to fill my portfolio with code, I will be working on it while bored finding job/next challenge.

App will be under development just to learn more about Frontend while I look for job/next challenge, see [my personal project page](https://me.casinoman.app).

Depending on how fast I find new work/job will decide how far I will take this app. I will be working on it a little bit, few hours per week

# Demo
You could check if [bowie.casinoman.app](https://bowie.casinoman.app) is up, to give impression:

### screen recordings:
- [bowie app - three in a row game & theme selection](https://www.youtube.com/watch?v=6ICsFWHlw3A)
- [bowie app - rock paper scissors game](https://www.youtube.com/watch?v=yIDjlCI9L0c)

### login/register screen
![pre auth screen login/register](https://raw.githubusercontent.com/ryan-west-casino/bowie-media/main/bowie-preauth-guest.png)

*more images @ [me.casinoman.app](https://me.casinoman.app) or [ryan-west-casino/bowie-media](https://github.com/ryan-west-casino-bowie-media)

## Development
This is an app I've developed from scratch utilizing Lumen (backend), React/NextJS (frontend), Docker/Kubernetes (container).

This repository contains the frontend. For backend check other repository (lumen).

## Setup frontend: development/
- Set backend url (lumen repository) to your api backend in .env (copy .env.example > .env)
- Install packages using `yarn install` or `pnpm install`
- Run app `yarn run dev` or `pnpm next dev`
- Visit app at `http://localhost:3000`

## Setup backend: production
Make use of process supervising like pm2 or supervisor, alternatively you can use this app on [vercel.app](https://vercel.app)
