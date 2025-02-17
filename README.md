<!-- # 날씨 기반 옷 추천 앱 WearForecast
Repository for the Backend server of the wearforecast project.
This is a project based on the GDG KU worktree.

<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p> -->
![](./images/Nestjs_logo.svg)
![](./images/Supabase_logo.png)
![](./images/Docker_logo.webp)
![](./images/GCP_logo.webp)

<!-- [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
<p align="center"><a href=https://github.com/nestjs/nest><strong>NestJS</a></p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p> -->
[NestJS](https://github.com/nestjs/nest)

## Overview
WearForecast is a weather-based clothing recommendation app designed to help users select outfits tailored to current weather conditions. This repository contains the backend server, built with NestJS, which powers the application by handling:

- **Robust Authentication**: Secure sign-up and login processes with support for Google and GitHub OAuth, plus email verification to ensure account authenticity.
- **User Management**: APIs for managing user profiles and preferences.
Weather Integration: Real-time weather data retrieval to inform personalized recommendations.
- **Personalized Recommendations**: Logic to generate outfit suggestions based on the latest weather and user settings.
- **Modern Tooling & Deployment**: Built with NestJS and Prisma for scalable server-side development, containerized with Docker, and deployed on Google Cloud Platform using automated CI/CD pipelines.

This project follows best practices for code quality, security, and maintainability, ensuring a reliable and efficient backend for the application.

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

## Compile and Run the project

```bash
$ yarn start:dev
```

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
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)--> -->

  <!-- README.html (You can rename this to README.md, but keep the HTML content) -->

<h1>날씨 기반 옷 추천 앱 WearForecast</h1>
<p>
  Repository for the Backend server of the wearforecast project.<br>
  This is a project based on the GDG KU worktree.
</p>

<!-- Images -->
<p>
  <img src="./images/Nestjs_logo.svg" alt="NestJS Logo">
  <img src="./images/Supabase_logo.png" alt="Supabase Logo">
  <img src="./images/Docker_logo.webp" alt="Docker Logo">
  <img src="./images/GCP_logo.webp" alt="GCP Logo">
</p>

<!-- Link to NestJS -->
<p>
  <a href="https://github.com/nestjs/nest">NestJS</a>
</p>

<!-- Overview -->
<h2>Overview</h2>
<p>
  WearForecast is a weather-based clothing recommendation app designed to help users select outfits
  tailored to current weather conditions. This repository contains the backend server, built with
  NestJS, which powers the application by handling:
</p>

<ul>
  <li>
    <strong>Robust Authentication:</strong> Secure sign-up and login processes with support for
    Google and GitHub OAuth, plus email verification to ensure account authenticity.
  </li>
  <li>
    <strong>User Management:</strong> APIs for managing user profiles and preferences.
    Weather Integration: Real-time weather data retrieval to inform personalized recommendations.
  </li>
  <li>
    <strong>Personalized Recommendations:</strong> Logic to generate outfit suggestions based on the latest
    weather and user settings.
  </li>
  <li>
    <strong>Modern Tooling &amp; Deployment:</strong> Built with NestJS and Prisma for scalable
    server-side development, containerized with Docker, and deployed on Google Cloud Platform
    using automated CI/CD pipelines.
  </li>
</ul>

<p>
  This project follows best practices for code quality, security, and maintainability, ensuring a
  reliable and efficient backend for the application.
</p>

<!-- API List -->
<h2>API List</h2>
<p>
  The following are the API List for the wearforecast app.<br>
  <em>These APIs are subject to change.</em>
</p>

<ul>
  <li>
    <strong>Auth</strong>
    <ul>
      <li>GET /google</li>
      <li>GET /google/callback</li>
      <li>GET /github</li>
      <li>GET /github/callback</li>
      <li>POST /sign-up</li>
      <li>GET /complete-signup</li>
      <li>POST /login</li>
      <li>POST /refresh</li>
      <li>PUT /password</li>
    </ul>
  </li>
  <li>
    <strong>Users</strong>
    <ul>
      <li>PATCH /profile</li>
    </ul>
  </li>
  <li>
    <strong>Weather</strong>
    <ul>
      <li>GET /weather</li>
    </ul>
  </li>
  <li>
    <strong>Recommendation</strong>
    <ul>
      <li>GET /recommendation</li>
    </ul>
  </li>
</ul>

<!-- Install the project -->
<h2>Install the project</h2>
<pre><code>
git clone https://github.com/WearForecast/BE-Server.git
</code></pre>

<!-- Project setup -->
<h2>Project setup (Install Dependency)</h2>
<pre><code>
yarn install
</code></pre>

<!-- Compile and Run -->
<h2>Compile and Run the project</h2>
<pre><code>
yarn start:dev
</code></pre>

