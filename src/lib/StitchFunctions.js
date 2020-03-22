import {Stitch,RemoteMongoClient,AnonymousCredential,GoogleRedirectCredential} from 'mongodb-stitch-browser-sdk'
import {toast} from 'react-toastify'

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
        return client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('stayneighbor');
    } catch(err){
        return {errorCode: '002', errorMessage: err}
    }
}

export function intializeStitchClient(){
    try {
        //return Stitch.initializeDefaultAppClient('stayneighbor-bjuma');
        return Stitch.initializeDefaultAppClient('stayneighbor_dev-nszik');
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
    await anonymousUserLogin()
    var db = establishMongoDbConnection()

    try {
        const orders = await db.collection('orders').find().toArray()
        return orders
    } catch(e){
        console.log(e)
        return e
    }
}

export async function putOrder(body){
    await anonymousUserLogin();
    try{
        //get our default app client
        const client = intializeStitchClient()
        var result = await client.callFunction("createOrder", [body]);
        if(result && result.errorCode) return {errorCode: result.errorCode, errorMessage: result.errorMessage}
        else return true
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

export function getUserInfo(){
    return intializeStitchClient().auth.currentUser
}