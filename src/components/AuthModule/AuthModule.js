import React from 'react'
import {Stitch,RemoteMongoClient,AnonymousCredential} from 'mongodb-stitch-browser-sdk'
import {GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";

const User = ({ data: name }) => name && <div><pre>{name}</pre></div>

export default function AuthModule(props) {
    let currentUser = false;
    setupStitch().then(res => console.log(res));
    //start stitch setup
    async function setupStitch() {
        //copy the name of your google-auth enabled stitch application here
        //the name of the app will typically be the stitch application name
        //with a "-"" + random string appended
        const appId = 'oauth-test-app-gdmyy';



        // Get a client for your Stitch app, or instantiate a new one
        const client = Stitch.hasAppClient(appId)
            ? Stitch.getAppClient(appId)
            : Stitch.initializeAppClient(appId);

        // The user has not yet authenticated. Begin the Google login flow.
        const credential = new GoogleRedirectCredential();
        client.auth.loginWithRedirect(credential);
        //manage user authentication state

        // Check if this user has already authenticated and we're here
        // from the redirect. If so, process the redirect to finish login.
        if (client.auth.hasRedirectResult()) {
            await client.auth.handleRedirectResult().catch(console.error);
            console.log("Processed redirect result.")
        }

        if (client.auth.isLoggedIn) {
            // The user is logged in. Add their user object to component state.
            let currentUser = client.auth.user;
            console.log("Current User:" + currentUser)
        } else {
            // The user has not yet authenticated. Begin the Google login flow.
            const credential = new GoogleRedirectCredential();
            client.auth.loginWithRedirect(credential);
        }
    }

    return !currentUser
        ? <div>User must authenticate.</div>
        : <User profile={currentUser.profile}/>
}



