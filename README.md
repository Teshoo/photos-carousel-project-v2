
# Photos Carousel Project
- Building a **dynamic carousel of pictures** with simultaneous **geographical follow on a map** 
- Goal is to create a **stimulating slideshows** by geographically recontextualizing the trips' pictures

This project is an **rework of a [first version](https://github.com/Teshoo/photos-carousel-project-v1)** ([demo](https://i.ibb.co/LSR1P8m/demo-projet-v1.gif)) made in 2023:
- UI/UX update
- Better code
- Trips and pictures management feature

## Built With
* **Vue.js 3.5**
* **Symfony 7.1**

- API Platform
- Leaflet & Vue Leaflet
- Vite & Vitest
- PosgreSQL
- Docker

**Languages:** Typescript, PHP 
## Roadmap

- [x]  **Pictures** creating, updating and deleting
- [x]  **Trips, Stages and Days** creating, updating and deleting
- [x]  **Hideout** creating, updating and deleting
- [x]  **Core feature**
    - [x] Carousel
    - [x] Map
    - [ ] Timeline
- [ ]  **UX improvements**  (tooltips, components loading, etc.)

## Overview
### Carousel (wip)
![](https://i.ibb.co/rNXHKdL/demo-carousel-wip.gif)

### Creating pictures
![](https://i.ibb.co/L51hTQ6/demo-create.gif)

### Updating picture coordinates
![](https://i.ibb.co/0JjBWD7/demo-update-latlng.gif)

## Docker image (for local use)
[Production docker image](https://github.com/Teshoo/photos-carousel-project-v2/pkgs/container/photos-carousel-project) available for local use
### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
### Setup
1. Copy/paste the following code in a `compose.yaml` file:
```yaml
name: photos-carousel-project

services:
  php:
    image: ghcr.io/teshoo/photos-carousel-project:latest
    environment:
      APP_SECRET: ${APP_SECRET}
      MERCURE_PUBLISHER_JWT_KEY: ${CADDY_MERCURE_JWT_SECRET:-secret}
      MERCURE_SUBSCRIBER_JWT_KEY: ${CADDY_MERCURE_JWT_SECRET-secret}
      DATABASE_URL: postgresql://${POSTGRES_USER:-root}:${POSTGRES_PASSWORD:-root}@database:5432/${POSTGRES_DB:-app}?serverVersion=${POSTGRES_VERSION:-15}&charset=${POSTGRES_CHARSET:-utf8}
      MERCURE_URL: ${CADDY_MERCURE_URL:-http://php/.well-known/mercure}
      MERCURE_PUBLIC_URL: ${CADDY_MERCURE_PUBLIC_URL:-https://${SERVER_NAME:-localhost}:${HTTPS_PORT:-443}/.well-known/mercure}
      MERCURE_JWT_SECRET: ${CADDY_MERCURE_JWT_SECRET:-MercureHubJWTSecretKey}
    volumes:
      - caddy_data:/data
      - caddy_config:/config
    ports:
      - name: http
        target: 80
        published: ${HTTP_PORT:-80}
        protocol: tcp
      - name: https
        target: 443
        published: ${HTTPS_PORT:-443}
        protocol: tcp
      - name: http3
        target: 443
        published: ${HTTP3_PORT:-443}
        protocol: udp
  
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-app}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-root}
      POSTGRES_USER: ${POSTGRES_USER:-root}
    healthcheck:
      test: ["CMD", "pg_isready", "-d", "${POSTGRES_DB:-app}", "-U", "${POSTGRES_USER:-root}"]
      timeout: 5s
      retries: 5
      start_period: 60s
    volumes:
      - database_data:/var/lib/postgresql/data:rw
    ports:
      - "5432"

volumes:
  database_data:
  caddy_data:
  caddy_config:
```
*You might also want to create a `.env` file with environment variables used in the `compose.yaml` file*

3. In the folder of your `compose.yaml` file, open a terminal and enter the following command:
```console
docker compose up --wait
```
Wait until the container are successfully created and healthy

4. Open your browser and navigate to localhost