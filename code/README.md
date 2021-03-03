# 2020-21 individual project : STI-Feed

This is the individual project repository for the [INFOB318 course](https://directory.unamur.be/teaching/courses/INFOB318) at University of Namur.

## About

This project is the result of a partnership between the University of Namur and the City of Namur. The idea is to build two websites allowing the authorities to communicate to regular citizens any traffic disturbance.

## How it works

Basically, when someone wants to use a part of the public circulation facilities (e. g. : Saturday weekly market, somebody moving out who needs to reserve a parking spot for a truck, etc) he must ask for the authorization to the City of Namur. If the City agrees to it, it produces an "*Arrêté de Police*" where it warns every citizen about the disturbance. This project is about giving some visibility to these "*Arrêté de Police*".

The City stores those in a public database (*Not available yet, i'm working with an Excel file for now*). This project serves to websites :

- A **control website** : A website protected with a password where a worker of the City can log in and see the content of the City's database. He can then write public messages for the events he finds relevant.
- A **public website** : A website accessible for everyone that shows messages written in the control website.

Both websites work with the same backend.

## Folders structure

- **/** : Backend
  - Using NestJS
- **/website/control/** : Control website
  - Using Angular
- **/website/public/** : Public website
  - Using Angular

## Build & Deployment

### Docker

You must first install [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/), and then run the following command in this directory :

```bash
docker-compose up -d
```

If you want to stop it, simply run this command in this directory :

```bash
docker-compose down
```

### Build preparation

You must now set your configuration up. You just have to edit the following files :

- **src/main.ts** : You'll find a line `await app.listen(...);`. This is the port on which the backend will run.
- **website/control/src/environments.ts** and **website/control/src/environments.prod.ts** : Where you can define the address used by the control site to reach the backend for both development and production setup. You'll choose which one to build later.
- **website/public/src/environments.ts** and **website/public/src/environments.prod.ts** : Where you can define the address used by the public site to reach the backend for both development and production setup. Should be the same as the one you gave for the control site.

### Build

Choose the right option depending on which build you're looking for

**You must install [npm](https://www.npmjs.com/get-npm) and [angular CLI](https://angular.io/cli) first**

#### Development

```bash
# Setup tinyMCE
npm install tinymce
cp node_modules/tinymce static/ -r
# Setup Nodes modules and builds
npm install
cd website/control/
npm install
ng build
cd ../public
npm install
ng build
```

#### Production

```bash
# Setup tinyMCE
npm install tinymce
cp node_modules/tinymce static/ -r
# Setup Nodes modules and builds
npm install
cd website/control/
npm install
ng build --prod
cd ../public
npm install
ng build --prod
```

### Run

Once it is build you can simply run it with the following command in this directory :

```bash
npm run start
```

### How to use ?

You can use both websites by following these routes :

- **Control website** : `{base_URL}/control-site/`
- **Public website** : `{base_URL}/public-site/`

Default logs are 

- **username :** admin 
- **password :** sti-feed 

## What's next ?

This project implements specific functionalities but lacks basic ones such as user management. You'll be able to create your own user accounts following the documentation provided in `src/users/user.controller.ts`. This user feature is implemented on backend side but not yet on frontend side.

## Contribute

You can contribute if you want. Automated tests are enabled using Jest. Any pull request must pass these tests before being accepted.