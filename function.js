const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  //location of .next generated after running -> yarn build
  conf: { distDir: '.next' },

});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});



// import * as functions from "firebase-functions";
// import {https} from "firebase-functions"
// import next from "next"

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //

// const isDev = process.env.NODE_END !== "production";

// const server = next({
//     dev: isDev,
//     //location of .next generated after running -> yarn build
//     conf: { distDir: '../../.next' },
//   });

// const nextjsHandle = server.getRequestHandler();

// export const nextServer = https.onRequest((req,res) => {
//     return server.prepare().then(() => nextjsHandle(req,res))
// })

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });