import {Stitch,RemoteMongoClient,AnonymousCredential} from 'mongodb-stitch-browser-sdk'

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
        return Stitch.initializeDefaultAppClient('stayneighbor-bjuma');
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