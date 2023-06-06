This is a Personal Library project where you can add, edit and delete authors and books.
The App stores the authors and the books in MongoDB.

Features:

1. Interactive Search Bar – performs the search as you type and the search results are updated on every key stroke.

2. Books Filter Bar - filters the book in a useful way by:
   • books read;
   • books not read;
   • books on reading in progress;
   • books read in the current year;
   • books read in the previous year.

3. Interactive Edit-Save fields for authors and books – the App makes full use of the React State, which helps in creating interactive and compact UI by avoiding the need of navigating the user to another page when editing an author or a book is necessary. Instead, the Edit and Save features are rendered by toggling the editing state from false to true. When the state changes, the UI changes accordingly. This React feature enables the user to edit, save and view authors and books.

4. Start or Stop reading a book - by pressing the Start button, the user lets the App know that this is the book they started reading. That book will display as being in progress and the system adds the current date and time to the database. After the book in read, if the Stop button is pressed, the book will be displayed as read and the current date and time added to the database. The dates are used when filtering the books by "read in the current year" and "read in the previous year".

Styling Note - this project's style sheets are minimal but pleasant because the styles are not the main focus of this project.

## Server Side

## Available Scripts

In the project "server" directory, you can run:

### `npm run start`

Starts the server that manages the MongoDB.
The server will listed on [http://localhost:4000]

## Client Side

## Available Scripts

In the project "client" directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
