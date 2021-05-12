import React from 'react';
import {AppProps} from "next/app"
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/assets/styles/theme'
import {FirebaseProvider} from "../src/firebaseUtils/context"
import SnackProvider from "../src/components/Snackbar/SnackContext"
import "assets/styles/globals.css"
import "../src/assets/styles/Bubble.css"
import { createFirestoreInstance } from "redux-firestore"
import { AlertServiceProvider, useAlertService } from 'core/utils/Alert/AlertContext';
import { ReactReduxFirebaseConfig, ReactReduxFirebaseProvider, ReactReduxFirebaseProviderProps} from 'react-redux-firebase';
import {TableContextProvider} from "components/Table/TableContext"
import { Provider } from 'react-redux';
import firebase from "firebase/app"
import { newStore } from 'store';
import {IAccount} from "core/models/Account"


const MyApp = ({Component,pageProps}:AppProps) => {
  const dialog = useAlertService()

  const generateReferral = () => {
    let result = ""
    const alphaNumber = "abcdefghijklmnopqrstuvwxyz1234567890"
    for(let i = 0; i < 7;i++){
        result.concat(alphaNumber[Math.round(Math.random()*alphaNumber.length)])
    }
    return result
}

  // This is the setup for the rrf
  const rrfConfig: Partial<ReactReduxFirebaseConfig> = {
    userProfile: "users",
    // uses firestore for user extra data
    useFirestoreForProfile: true,
    // Know and store the list of available users and their sessions
    presence: 'presence',
    sessions: 'sessions',
    // autoPopulateProfile:true,
    autoPopulateProfile:true,
    useFirestoreForStorageMeta:true,
    
    // Adds role based value on the saved user data
    profileFactory: (user,profileData,firebase) => {
      const profile:IAccount = {
        email: user.email,
        usernamme:user.displayName,
        phoneNumber:user.phoneNumber,
        referralNumber:generateReferral(),
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        profileImage:user.photoURL || "",
        id:user.uid
      } as any

        const messaging = (firebase as any).messaging()
        messaging.requestPermission().then(function(){
          return messaging.getToken()
        }).then(token => {
          console.log("this is the token",{token})
          firebase.firestore().collection("fcmToken").doc((user as any).user.uid).set({
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            username:user.displayName,
            token
          })
        }).catch(err => {
          console.log({err})
        })
      return profile
    }
  }
  const store = newStore();

  // This is the ref passed to the component
  const rrfProps: ReactReduxFirebaseProviderProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <AlertServiceProvider>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <TableContextProvider>
                <Component {...pageProps} />
              </TableContextProvider>
            </ThemeProvider>
          </ReactReduxFirebaseProvider>
        </AlertServiceProvider>
      </Provider>
    </React.Fragment>
  );
}
export default SnackProvider(FirebaseProvider(MyApp))