import config from "../utils/config"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import {IAccount} from "../core/models"


class Firebase {

    public auth:ReturnType<typeof firebase.auth>;
    public firestore:ReturnType<typeof firebase.firestore>;
    public storage;
    public googleProvider:InstanceType<typeof firebase.auth.GoogleAuthProvider>;
    public facebookProvider:InstanceType<typeof firebase.auth.FacebookAuthProvider>;
    public twitterProvider;

    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }else{
            firebase.app()
        }
        this.auth = firebase.auth();
        this.firestore = firebase.firestore();
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.facebookProvider = new firebase.auth.FacebookAuthProvider();
        this.twitterProvider = new firebase.auth.TwitterAuthProvider()
        this.facebookProvider.addScope("public_profile,email")
        this.googleProvider.addScope("profile")
        this.googleProvider.addScope("email")
    }
    signInWithGoogle = () => (
        this.auth.signInWithPopup(this.googleProvider)
    )
    signInWithTwitter = () => (
        this.auth.signInWithRedirect(this.twitterProvider)
    )
    signInWithFacebook = () => (
        this.auth.signInWithRedirect(this.facebookProvider)
    )
    onAuthUserListener = (setState:any) => {
        this.auth.onAuthStateChanged(authUser => {
            if(authUser){
                setState({currentUser:authUser})
            }else{
                setState({user:null})
            }
        })
    }
    createNewUser = async (arg:IAccount) => {
        try{
            const response = await this.firestore.collection("users").add(arg)
            return response
        }catch(err){
            throw err
        }
    }
    createTimeStamp = () => (
        firebase.firestore.FieldValue.serverTimestamp()
    )
    generateReferral = () => {
        let result = ""
        const alphaNumber = "abcdefghijklmnopqrstuvwxyz1234567890"
        for(let i = 0; i < 7;i++){
            result.concat(alphaNumber[Math.round(Math.random()*alphaNumber.length)])
        }
        return result
    }
}
export default Firebase