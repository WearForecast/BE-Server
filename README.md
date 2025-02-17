<h1>날씨 기반 옷 추천 앱 WearForecast</h1>
<p>
  Repository for the Backend server of the wearforecast project.
  This is a project based on the GDG KU worktree.
</p>

<p align="center">
  <img src="./images/Nestjs_logo.svg" alt="NestJS Logo" width="120" style="margin: 30px;">
  <img src="./images/supabase-icon.svg" alt="Supabase Logo" width="120" style="margin: 30px;">
  <img src="./images/docker-official.svg" alt="Docker Logo" width="120" style="margin: 30px;">
  <img src="./images/google_cloud-icon.svg" alt="GCP Logo" width="120" style="margin: 30px;">
</p>

<p align="center">Built with <a href=https://github.com/nestjs/nest><strong>NestJS</a>, a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

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

<h2>Install the project</h2>
<pre><code>$ git clone https://github.com/WearForecast/BE-Server.git</code></pre>

<h2>Project setup (Install Dependency)</h2>
<pre><code>$ yarn install</code></pre>

<h2>Compile and Run the project</h2>
<pre><code>$ yarn start:dev</code></pre>