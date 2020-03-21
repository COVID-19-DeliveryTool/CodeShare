import React from 'react'
import {Stitch,RemoteMongoClient,AnonymousCredential} from 'mongodb-stitch-browser-sdk'
import {GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";

const User = ({ data: profile }) => profile && <div><pre>{profile.name}</pre></div>

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

        if (client.auth.isLoggedIn) {
            // The user is logged in. Add their user object to component state.
            currentUser = client.auth.user;
            console.log("Current User:" + currentUser)
        } else {
            // Check if this user has already authenticated and we're here
            // from the redirect. If so, process the redirect to finish login.
            if (client.auth.hasRedirectResult()) {
                await client.auth.handleRedirectResult()
                console.log("Processed redirect result.")
            }

            // The user has not yet authenticated. Begin the Google login flow.
            const credential = new GoogleRedirectCredential();
            client.auth.loginWithRedirect(credential);
        }

        // The user has not yet authenticated. Begin the Google login flow.
        //const credential = new GoogleRedirectCredential();

        //console.log(await client.auth.loginWithCredential(credential))
        //manage user authentication state
    }
    console.log(currentUser)
    return !currentUser
        ? <div>User must authenticate.</div>
        : <User data={currentUser.profile.data}/>
}



