# freeirccloud-frontend

FreeIRC is a IRC service running at https://freeirc.cloud 

- Persist connection to multiple networks. Available networks: IRCnet, QuakeNet.
- Access IRC using your mobile phone, desktop PC, or any device with a browser on it.
- Upload pictures within seconds and share them with other users.
- Receive push notifications to your smartphone when someone mentions you or sends you a private message.

## Features
- Support for the following IRC commands:
  - JOIN, PART, MESSAGE, QUIT, MODE, KICK
- Uses Firebase authentication
- Mobile (web)/Windows/Mac/Linux clients (electron.js)
- Support for QuakeNet and IRCnet
- Support for uploading pictures, long texts from clipboard
- Automatic deletion of uploaded pictures after 30 days
- Shows messages that have been sent while away

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
