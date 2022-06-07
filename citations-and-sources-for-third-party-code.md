# Citations and Sources

We wanted to provide some citations for external code and packages leveraged in this project that encompass usage of copied/adapted/based work.

Largely any code that exists as implemented within the source files of the server and client folders is our own. However, in a couple of places we did leverage some online resources.

## Server Implementation Citations

- For the user password and JWT token encryption, we leveraged a [found gist on Github](https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb). This gist provided an implementation using the crypto package that comes natively with node js. This can be seen within the file at `/server/utils/encryption.mjs`. 
  - Source: https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
- For the JSON web token implementation, we based our work largely on a [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs) that provided the basic framework for our middleware. The work for this mainly encompasses the implementation for the `checkAuthToken` middleware function in the file `/server/utils/middleware.mjs`. The other two functions we implemented on our own through research on the express documentation.
  - Source: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
- Outside these two examples, we used a variety of standard node libraries including packages like `express`, `mysql`, `cors`, and other open source packages. All the code leveraged here was implemented through help of the documentation for each of these packages. These include:
  - [cors](https://github.com/expressjs/cors)
  - [dotenv](https://github.com/motdotla/dotenv)
  - [express](https://github.com/expressjs/express)
  - [express-mysql-session](https://github.com/chill117/express-mysql-session#readme)
  - [express-session](https://github.com/expressjs/session)
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - [mysql](https://github.com/mysqljs/mysql)

## Client Implementation Citations

- Our frontend was built with a variety of packages and libraries as well, all which can be seen below:
  - [click-outside-vue3](https://github.com/andymark-by/click-outside-vue3#readme)
  - [js-cookie](https://github.com/js-cookie/js-cookie)
  - [lodash](https://github.com/lodash/lodash)
  - [moment](https://github.com/moment/moment)
  - [pinia](https://github.com/vuejs/pinia)
  - [vue](https://github.com/vuejs/vue)
  - [vue-router](https://github.com/vuejs/router)
  - [vue-toastification](https://github.com/Maronato/vue-toastification)
  - [tailwindcss](https://github.com/tailwindlabs/tailwindcss)

## Developer Dependencies
Several other packages were used within our development process that did not have a direct impact on the end product of our project, but helped with the end goal. These packages included tools like CSS pre-processors, linters, formatters, and others. These can be seen with package.json at the root of this project.
