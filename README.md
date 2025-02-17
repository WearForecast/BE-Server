# 날씨 기반 옷 추천 앱 WearForecast
GitHub Repository for the Backend server of the wearforecast project.
This is a project based on GDG KU.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
<p align="center"><a href=https://github.com/nestjs/nest><strong>NestJS</a></p>
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <!-- <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p> -->
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Overview
WearForecast is a weather-based clothing recommendation app designed to help users select outfits tailored to current weather conditions. This repository contains the backend server, built with NestJS, which powers the application by handling:

**- Robust Authentication**: Secure sign-up and login processes with support for Google and GitHub OAuth, plus email verification to ensure account authenticity.
**- User Management**: APIs for managing user profiles and preferences.
Weather Integration: Real-time weather data retrieval to inform personalized recommendations.
**- Personalized Recommendations**: Logic to generate outfit suggestions based on the latest weather and user settings.
**- Modern Tooling & Deployment**: Built with NestJS and Prisma for scalable server-side development, containerized with Docker, and deployed on Google Cloud Platform using automated CI/CD pipelines.

Developed as part of the WearForecast initiative and inspired by GDG KU, this project follows best practices for code quality, security, and maintainability, ensuring a reliable and efficient backend for the application.

## API List
The following are the API List for the wearforecast app.

**These APIs are subject to change.**
- Auth 
    - GET /google
    - GET /google/callback
    - GET /github
    - GET /github/callback
    - POST /sign-up
    - GET /complete-signup
    - POST /login
    - POST /refresh
    - PUT /password
- Users
    - PATCH /profile
- Weather
    - GET /weather
- Recommendation
    - GET /recommendation

## Install the project

```bash
$ git clone https://github.com/WearForecast/BE-Server.git
```

## Project setup(Install Dependency)

```bash
$ yarn install
```

## Compile and run the project

```bash
$ yarn start:dev
```