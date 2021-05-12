import { IAccount } from "core/models/Account"
import { dialogServiceType } from "core/utils/Alert/AlertContext"
import "firebase/functions"
import "firebase/messaging"
import { ExtendedFirebaseInstance } from "react-redux-firebase"

class firebaseMessaging {
    private token:string;
    constructor(
        public firebaseApp:ExtendedFirebaseInstance,private user:Partial<IAccount>,
        private dialog:dialogServiceType, private requestToken:boolean
        ){
        this.init()
    }
    async init () {
        try{
            const messaging = (this.firebaseApp as any).messaging()
            if(this.requestToken){
                await Notification.requestPermission()
                const token = await messaging.getToken({
                    vapidKey:"BKXZ60SLd0y4tUaay-FwDQTk0ssJm7DVCjlqKa0feBGd3Uycm_roKizOp4j315bgcRpbNyjhGyjJ_Z2xwuM1J9E"
                })
                this.token = token
            }
        }catch(err){
            console.error(err)
        }
    }

    async sendMessage ({
        title,body
    }:{
        title:string;
        body:string
    }) {
        (this.firebaseApp as any).functions().useEmulator("localhost",5001);
        const notificationMessaging = (this.firebaseApp as any).functions().httpsCallable("sendFCMMessage")
        return new Promise((resolve,reject) => {
            const newNotification = {
                userId:this.user.id,
                username:this.user.username,
                ...(this.token && {token:this.token}),
                title,
                body
            }
            notificationMessaging(newNotification).then(payload => {
                return resolve(payload)
            }).catch(err => {
                reject(err)
            })  
        })
    }
}

export {firebaseMessaging}