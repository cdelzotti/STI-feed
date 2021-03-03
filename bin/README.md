# How to run

Make sure your working directory is this directory.

## Run Docker

You must first install [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/), and then run the following command :

```bash
docker-compose up -d
```

If you want to stop it, simply run this command :

```bash
docker-compose down
```

## Install dependencies

Just run :

```bash
npm install
```

## Run build

**You must install [node](https://nodejs.org/en/download/) first**

Then simply type :

```bash
node dist/src/main.js
```

## Use

Simply go to

- **Control site** : [http://localhost:3000/control-site/](http://localhost:3000/control-site/)
- **Public site** : [http://localhost:3000/public-site/](http://localhost:3000/public-site/)

Default user is :

- **username** : admin
- **password** : sti-feed