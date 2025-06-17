<a id="readme-top"></a>
This is the backend for the Task Management App built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**.
<!-- PROJECT Demo -->

## Demo<!-- Required -->

<br />
<div align="center">
  <h3 align="center">Task Management Backend</h3>
  <p align="center">
    An awesome elementary backend task!
  </p>
  <img alt="demo" src='./images/Demo.gif' />
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#dear-instructor">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is the backend for the **Task Management App** built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**. The project is focused on implementing RESTful APIs for task and category management while learning core backend development concepts.

### ✨ Key Features:
- RESTful API for managing tasks and categories
- MongoDB with Mongoose ODM
- Environment-based configuration with `.env`
- Error handling middleware
- Async route handling
- Dockerized backend and database
- Mongo Express for UI-based DB browsing

Through this project, I gained real-world backend development experience, including database integration, route structuring, error handling, and Docker-based workflows.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![Node.js][Node.js]
- ![Express.js][Express.js]
- ![MongoDB][MongoDB]
- ![TypeScript][TypeScript]
- ![Docker][Docker]
- ![Postman][Postman]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### 🐳 MongoDB Setup with Docker Compose

Make sure Docker is running. Then:

   ```sh
   docker compose -f mongo.yaml up -d
   ```
- MongoDB will be available at: mongodb://admin:password@localhost:27017

- Mongo Express will be available at: http://localhost:8888

1. Clone the repo
   ```sh
   git clone https://github.com/Mahdi-Golriz/task-management-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build the project
  ```sh
  tsc
  ```
4. Run in developement
  ```sh
  npm run dev
  ```

🔐 Environment Variables
Create a .env file in the root:

```env
NODE_ENV=development
PORT=5555
MONGO_URL=mongodb://admin:password@localhost:27017/taskmanagement?authSource=admin
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## :closed_book: License

## Dear Instructor

<a href="https://github.com/MRezaSafari">
  Reza Safari
</a>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

Released in 2024 :closed_book: License

Made by Mahdi Golriz 🚀.
This project is under the [MIT license](https://opensource.org/licenses/MIT).

Give a ⭐️ if this project helped you!
