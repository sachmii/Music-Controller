# Django-React Full-Stack Web App

As part of my journey into developing web applications with Django and React, I'm building this project for educational purposes. This is a learning exercise focused on understanding how these two frameworks can work together to build a full-stack application. 

I'm documenting the steps as I follow along with a YouTube tutorial playlist: [Django and React Full-Stack Guide](https://youtube.com/playlist?list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&si=YfBI6CVFyO93lVIb).

Feel free to explore the code, leave feedback, or suggest new features I could implement!

## Features

- Backend built with **Django** (for robust backend logic and API)
- Frontend created with **React** (for dynamic and responsive UI)
- REST API integration between Django and React
- Dockerized development and production environment

## Installation

### Prerequisites
- Docker and Docker Compose installed (for running the app with Docker)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sachmii/Music-Controller.git
   cd HouseParty
   ```



## Build and Run the Containers

**Make sure Docker and Docker Compose are installed on your system.**

To build and start the app in Docker, run:
```bash
docker-compose up --build
```

## Build and Run

1. **Build Docker Images:**
   Build Docker images for both the frontend and backend services.
2. **Start Containers:**
   Start the Docker containers for the frontend (React) and backend (Django) services.

## Access the App

* **Backend:** http://localhost:8000
* **Frontend:** http://localhost:3000

## Stop the Containers

To stop the running Docker containers, execute the following command:
```bash
docker-compose down
```

## Docker Setup

This project includes Docker configuration files for both the backend and frontend services.

* **Backend:** The backend service is built using a `python:3.10-slim` Docker image.
* **Frontend:** The frontend service is built using a `node:16` Docker image.

Docker Compose is employed to orchestrate and manage both services together.

## Common Issues

* **Missing Node Modules:** If the frontend fails to build due to missing modules (e.g., `style-loader`), ensure you run `npm install` to install all necessary dependencies before building the Docker image.

**Feel free to customize the content based on your specific project setup and instructions.**
