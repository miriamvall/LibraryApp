# Library App

Web application that is used to manage a user's library, performing CRUD operations on the stored books. The MEAN stack (MongoDB, Express.js, [Angular](https://angular.io/) and Node.js) was used to build it.

It implements a REST API on its back-end part, and Angular is used for the front-end one, also employing reactive forms. [Bootstrap](https://getbootstrap.com/) was used for the overall styling.

## The app allows the user to:

* Register on the app
* Authenticate themselves securely
* Log in to their own profile
* Add new books to their library
* Delete books from their library
* Edit a book's information
* See all the books in their library
* Log out of their profile

## Back-end - REST authentication with Tokens

* The REST API of the app is built using Express.js and Node.js, and is secure thanks to JSON web tokens. 
* When a registered user wants to log in, the server creates a distinct token and sends it back to the client; the token will then be locally stored and verified by the server each time the client does another HTTP request.
* The user's password is safely encrypted with the bcryptjs hashing method and stored in the MongoDB database.

## Front-end user authentication

* The HttpInterceptor class allows the JSON web token that is created when a user logs in to be stored in the authorization header. Therefore, if a component requires an authorization token to be visualized, only the authenticated user will be able to access it.
* Restricted routes are protected with the CanActivate interface class (only logged-in users can access certain urls in the app).

## Some screenshots of the application

Log-in page

![login](https://github.com/miriamvall/LibraryApp/blob/master/screenshots/login.png)

User profile page

![profile](https://github.com/miriamvall/LibraryApp/blob/master/screenshots/profile.png)

User book list (no books added)

![nobooksyet](https://github.com/miriamvall/LibraryApp/blob/master/screenshots/nobooksyet.png)

Add book

![addbook](https://github.com/miriamvall/LibraryApp/blob/master/screenshots/addbook.png)

User book list

![booklist](https://github.com/miriamvall/LibraryApp/blob/master/screenshots/booklist.png)

## More about the app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

MongoDB must be installed and running for the application to work properly, as well as the other used frameworks of the development stack, including NPM.
To run the back-end server, execute "node server.js" on the command line.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
