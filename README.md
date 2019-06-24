## SMART HOUSING INFORMATION SYSTEM
Developed using PEVN (Postgres, Express, Vue & Node) Stacks. Structure influenced by RoR framework.

### A. Technology Stacks
- Frontend Developed on top of Vue.js
- Backend Developed using Node.js & Express Framework
- Postgres Database

### B. Spec
- Frontend
  1. Vuetify.js
  2. State management using Vuex

- Backend
  1. User Authentication => JWT
  2. Migration & ORM => Sequelize
  3. Validation using Hapi/Joi
  4. Testing Framework => Jest

- Testing Env
  1. Jest & Node Assert

## C. USEFUL CLI

#### Backend Installation
  1. Install Backend Server
```sh
$ npm install
```
  2. Migrate Database
```
$ npm run migrate
```
  3. Prepare Frontend
```sh
$ npm run prepare-frontend
```
  4. Start The Server on Dev Mode
```
$ npm run dev
```

#### Frontend Installation
  WIP

#### D. Migration
  1. Create New Model
```sh
$ node node_modules/sequelize-cli/lib/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```