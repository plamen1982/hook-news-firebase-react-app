Link to the project [https://hooks-news-application.firebaseapp.com]
##Technics used in the project:
### Deploying with Firebase
    1.In the console -> yarn run build or npm run build- build project for deploy
    2.In the console -> firebase init hosting - then:
        2.1 What do you want to use as your public directory? Write -> build
        2.2 Configure as a single-page app - answer is Yes write -> Y
        2.3 File build/index.html already exists. Overwrite -answer is No write -> N
        2.4 Finaly deploying -> write in the console -> firebase deploy
### Working with Firebase
    - Authentication with Firebase(Login, Logout, Forget password and then change password with email link)
    - CRUD operations with Firebase API
    - Sorting queries with Firebase API
    - Pagination and working with cursors
    - Creating Firebase class that has next functionality:
        - initialize firebase API with configuration(received when project is created in Firebase)
        - reference to app.auth() method that give you onAuthStateChanged() method that returns user object - if the user object is null user is not logged in otherwise is logged in then this user is passed to the global context so we can have access from the whole app
        - reference to Firebase through db object and in this object has: next functionality:
            -db.collections('collectionName').add(documentObject) - add one document to the collection
            -db.collections('collectionName').add(documentId) - fetch one document from collection
            -db.collection('collectionName').onSnapshot(callbackFunc) - returns in a callback function a live connected object with the whole collection
            -db.collection('collectionName').get().then() - returns a promise with the current version of the collection in the Firestore
    -const unsubscribe = return firebase.db.collection('nameCollection') - when we execute the unsubscribe() method we not longer listen for this collection and not making any updates, should be used in conjuction with useEffect hook in the return;
    -deployng serverless function -> firebase deploy --only functions
### Working with React Hooks
    - Custom hook - reused in different components with functionality: validation different forms with the help of custom functions pass as argument to the hook
    - Authenticate operations on forms(if user is not logged in redirect to login page)
    - useContext for global state for the whole app(for firebase API object and user(if the user is not logged in this object is empty))
    - useEffect for fetching data and side effects when the hook work like componentDidMount(), observe state of state variables in the current component, also used for subscribing(when component is mount) and unsubscribing(when component is unmounted) to Firebase references 
    - useState for state variables and then use it in the UI template(for showing different forms, for pending data that will be fetched, for list data, for sorted data(ex: updatedLinkList)) that is different from the original fetched array
    -
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
