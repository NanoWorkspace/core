![nano banner](assets/images/banner.jpg)

![GitHub forks](https://img.shields.io/github/forks/CamilleAbella/Nano?color=black&logo=github&style=for-the-badge) ![GitHub stars](https://img.shields.io/github/stars/CamilleAbella/Nano?color=black&logo=github&style=for-the-badge) ![GitHub watchers](https://img.shields.io/github/watchers/CamilleAbella/Nano?color=black&logo=github&style=for-the-badge)

# Nano (なの) Template ![](assets/images/logo.png)

![GitHub top language](https://img.shields.io/github/languages/top/CamilleAbella/Nano?color=%23BDB76B&style=plastic)
[![GitHub search todo](https://img.shields.io/github/search/CamilleAbella/Nano/todo?color=%23BDB76B&label=todo%20count&style=plastic)](https://github.com/CamilleAbella/Nano/search?l=TypeScript&q=todo)
![GitHub repo size](https://img.shields.io/github/repo-size/CamilleAbella/Nano?color=%23BDB76B&label=size&style=plastic)
![GitHub All Releases](https://img.shields.io/github/downloads/CamilleAbella/Nano/total?color=%23BDB76B&style=plastic)
![GitHub issues](https://img.shields.io/github/issues/CamilleAbella/Nano?color=%23BDB76B&style=plastic)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/CamilleAbella/Nano?color=%23BDB76B&include_prereleases&style=plastic)

A Discord bot core in TypeScript

## Dependencies

![better-sqlite3](https://img.shields.io/github/package-json/dependency-version/CamilleAbella/NanoTemplate/better-sqlite3?color=orange&style=plastic)
![chalk](https://img.shields.io/github/package-json/dependency-version/CamilleAbella/NanoTemplate/chalk?color=orange&style=plastic)
![discord.js](https://img.shields.io/github/package-json/dependency-version/CamilleAbella/NanoTemplate/discord.js?color=orange&style=plastic)
![dotenv](https://img.shields.io/github/package-json/dependency-version/CamilleAbella/NanoTemplate/dotenv?color=orange&style=plastic)
![enmap](https://img.shields.io/github/package-json/dependency-version/CamilleAbella/NanoTemplate/enmap?color=orange&style=plastic)

## Usage

### 1. Install

- `npm i nano-bot`

### 2. Prepare

- Make `.env` file with `TOKEN=YOUR_TOKEN` on your root project folder.

### 3. Import

```ts
import * as Nano from "nano-bot"
```

### 4. Code in TypeScript

- Please use `src/app/Embed.ts` class to make embeds.
- Add your own modules in `src/modules/`.
- Check the existing modules for examples.
- The Discord client is in the `Globals` object as `client`.
- The ApplicationClient is fetched in the `Globals` object as `bot`.

### 5. Scripts explanation

```json5
{
  // Prettify the code automatically on build or push action.
  prettier: "prettier src --write",

  // Create the local "dist" runnable folder for deployment.
  build: "git rm -r --ignore-unmatch -f ./dist && npm run prettier && tsc",

  // Build and start directly the bot for debugging.
  start: "npm run build && node .",
}
```

## 6. Future features

- Implement hot reloading with Gulp.
