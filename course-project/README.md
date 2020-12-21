# Deploying Angular App to Firebase Hosting

1. Check environment variables

2. Build production code

```bash
ng build --prod
```

3. Install Firebase CLI

```bash
npm install -g firebase-tools
```

4. Login to Firebase

```bash
firebase login
```

5. Initialise Firebase

```bash
firebase init
```

6. Deploy

```bash
firebase deploy
```

# Animations

1.

```bash
npm install --save @angular/animations
```

2. Add the `BrowserAnimationsModule` to your imports[] array in AppModule

- This Module needs to be imported from @angular/platform-browser/animations' => import { BrowserAnimationsModule } from '@angular/platform-browser/animations' (in the AppModule!)
- You then import trigger , state , style etc from @angular/animations instead of @angular/core

# CourseProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

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
