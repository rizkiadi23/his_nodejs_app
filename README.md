## SMART HOUSING INFORMATION SYSTEM
Developed using PEVN (Postgres, Express, Vue & Node) Stacks. Structure influenced by RoR framework.

### A. Technology Stacks
- Frontend Developed on top of Vue.js
- Backend Developed using Node.js & Express Framework
- Postgres Database

### B. Spec
- Frontend
  a. Vuetify.js
  b. State management using Vuex

- Backend
  a. User Authentication => JWT
  b. Migration & ORM => Sequelize
  c. Validation using Hapi/Joi
  d. Testing Framework => Jest

- Testing Env
  a. Jest & Node Assert

## C. USEFUL CLI

#### Backend Installation
0. Install `concurrently` as the task runner
```sh
$ npm install -g concurrently
```
1. Install Backend Server
```sh
$ npm install
```
2. Migrate Database
```
$ npm run migrate
```
3. Start The Server on Dev Mode
```
$ npm run development
```

#### Frontend Installation
  WIP

#### D. Migration
1. Create New Model
```sh
$ node node_modules/sequelize-cli/lib/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```