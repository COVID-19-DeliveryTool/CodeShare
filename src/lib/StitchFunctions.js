import {Stitch,RemoteMongoClient,AnonymousCredential,GoogleRedirectCredential, BSON} from 'mongodb-stitch-browser-sdk'

//Load config from .env file
require('dotenv').config();

function getAppId(){
    if(process.env.NODE_ENV === 'development') return 'stayneighbor_dev-nszik'
    if(process.env.NODE_ENV !== 'development') return 'stayneighbor-bjuma'
}

function getDb(){
    if(process.env.NODE_ENV === 'development') return 'stayneighbor-dev'
    if(process.env.NODE_ENV !== 'development') return 'stayneighbor'
}

function establishMongoDbConnection(){

    //get our default app client
    const client = intializeStitchClient()

    if(client.errorCode) return {errorCode: '002', errorMessage: client}

    const mongodb = initalizeStitchServiceClient(client)

    if(mongodb.errorCode) return {errorCode: '003', errorMessage: mongodb}
    
    return mongodb
}

export function initalizeStitchServiceClient(client){
    try{
        return client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(getDb());
    } catch(err){
        return {errorCode: '002', errorMessage: err}
    }
}

export function intializeStitchClient(){
    try {
        //return Stitch.initializeDefaultAppClient('stayneighbor-bjuma');
        return Stitch.initializeDefaultAppClient(getAppId());
    } catch(err){
        return Stitch.defaultAppClient
    }
}

export async function anonymousUserLogin(){
    try {
        var client = intializeStitchClient()
        var auth = await client.auth.loginWithCredential(new AnonymousCredential)
        console.log(auth)
    } catch(e) {
        return e
    }
}

export async function getOrders(){
    const client = intializeStitchClient()

    try {
        var result = await client.callFunction("listOrders", []);
        if(result && result.errorCode) return {errorCode: result.errorCode, errorMessage: result.errorMessage}
        return result
    } catch(e){
        console.log(e)
        return e
    }
}

export async function putOrder(body){
    try{
        //get our default app client
        const client = intializeStitchClient()
        if(!client.auth.isLoggedIn) await anonymousUserLogin()

        var result = await client.callFunction("createOrder", [body]);
        logUserOut()
        // if(result && result.status !== '200') return result
        // else return true
        return result
    } catch(e){
        return {errorCode: '002', errorMessage: e.toString()}
    }
}

export async function checkUserAuth(){
    try {
        //get our default app client
        const client = intializeStitchClient()

        if(client.auth.isLoggedIn){
            return true
        } else {
            if(client.auth.hasRedirectResult()){
                var result = await client.auth.handleRedirectResult()
                if(result.isLoggedIn === true) return true
            }

            const credential = new GoogleRedirectCredential()
            await client.auth.loginWithRedirect(credential)
            return null
        }
    } catch (e){

    }
}

export async function logUserOut(){
    await intializeStitchClient().auth.logout()
    return true
}

export async function getUserInfo(){
    var client = intializeStitchClient()
    var db = establishMongoDbConnection()

    await client.auth.refreshCustomData()

    var user = await db.collection('user_data').findOne({user_id: client.auth.user.id})

    if(user.errorCode) return false

    return {...client.auth.currentUser, customData: {...user}}

    //return intializeStitchClient().auth.currentUser
}