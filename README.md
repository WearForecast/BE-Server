# 날씨 기반 옷 추천 앱 WearForecast
Repository for the Backend server of the wearforecast project.
This is a project based on the GDG KU worktree.

<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p> -->

<!-- [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
<p align="center"><a href=https://github.com/nestjs/nest><strong>NestJS</a></p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p> -->

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


<h1>날씨 기반 옷 추천 앱 WearForecast</h1>
<p>
  Repository for the Backend server of the wearforecast project.<br>
  This is a project based on the GDG KU worktree.
</p>

<!-- Images -->
<p align="center">
  <img src="./images/Nestjs_logo.svg" alt="NestJS Logo" width="120">
  <img src="./images/supabase-icon.svg" alt="Supabase Logo" width="120">
  <img src="./images/docker-official.svg" alt="Docker Logo" width="120">
  <img src="./images/google_cloud-icon.svg" alt="GCP Logo" width="120">
</p>

<!-- Link to NestJS -->
<p align="center"><a href=https://github.com/nestjs/nest><strong>NestJS</a></p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

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
<code>
$ git clone https://github.com/WearForecast/BE-Server.git
</code>

<!-- Project setup -->
<h2>Project setup (Install Dependency)</h2>
<code>
$ yarn install
</code>

<!-- Compile and Run -->
<h2>Compile and Run the project</h2>
<code>
$ yarn start:dev
</code>

