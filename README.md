# CS 340 Semester Project
CS 340 Project for the Retro Tigers Team

## Local Development

To run this project locally, go through the following steps:

- Using a terminal prompt clone this repository to a local directory
- Change directory into the project directory and run `npm install`
- Add the following required environment variables:
  - Within `/server` folder, use `.env.example` as a template
    - `DB_HOST` - The hostname where your DB can be accessed
    - `DB_USER` - The user for your local DB instance
    - `DB_PASSWORD` - The password for your local DB instance
    - `DB_NAME` - The name of the database you'd like to use
    - `CLIENT_URI` - The URI/URL of your local client instance, defaults to http://localhost:3000
  - Within `/client` folder, use `.env.example` as a template
    - `SERVER_URI` - The URI/URL of your local server instance, defaults to http://localhost:3000
