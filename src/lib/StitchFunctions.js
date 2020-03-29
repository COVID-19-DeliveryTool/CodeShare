import {Stitch,RemoteMongoClient,GoogleRedirectCredential,FunctionCredential} from 'mongodb-stitch-browser-sdk'

function getAppId(){
    if(process.env.NODE_ENV !== 'development') return 'stayneighbor-bjuma'
    if(process.env.NODE_ENV === 'development') return 'stayneighbor-bjuma'
}

function getDb(){

    if(process.env.NODE_ENV === 'development') return 'stayneighbor'
    if(process.env.NODE_ENV !== 'development') return 'stayneighbor'
}

export function establishMongoDbConnection(){
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

export async function functionUserLogin(){
    try {
        var client = intializeStitchClient()
        await client.auth.loginWithCredential(new FunctionCredential({}))
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
        if(client.auth.isLoggedIn) await client.auth.logout()
        await functionUserLogin()

        var result = await client.callFunction("createOrder", [body]);
        logUserOut()
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

    if(!user) return false
    return {...client.auth.currentUser, customData: {...user}}

    //return intializeStitchClient().auth.currentUser
}

export async function getDrivers(){
    const client = intializeStitchClient()

    try {
        var result = await client.callFunction("getDrivers", [])
        if(result && result.errorCode) return {errorCode: result.errorCode, errorMessage: result.errorMessage}
        return result
    } catch(e){
        console.log(e)
        return e
    }
}

export async function assignOrder(orderId, driverEmail){
    const client = intializeStitchClient()
    try {
        var result = await client.callFunction("assignOrder", [orderId.toString(), driverEmail]);
        if(result && result.errorCode) return {errorCode: result.errorCode, errorMessage: result.errorMessage}
        console.log(result)
        return result
    } catch(e){
        console.log(e)
        return e
    }
}

export async function updateOrderStatus(orderId, orderStatus){
    const client = intializeStitchClient()

    try {
        var result = await client.callFunction("updateOrderStatus", [orderId.toString(), orderStatus]);
        if(result && result.errorCode) return {errorCode: result.errorCode, errorMessage: result.errorMessage}
        return result
    } catch(e){
        console.log(e)
        return e
    }
}


export async function updateOrderFields(order, addressUpdated){
    const client = intializeStitchClient()

    try {
        var result = await client.callFunction("updateOrder", [order._id.toString(), order, addressUpdated])
        return result
    } catch(e){
        console.log(e)
        return e
    }
}

export async function getOrder(orderId){
    try{
        var db = establishMongoDbConnection()
        var user = await db.collection('orders').findOne({_id: orderId})
        return user
    } catch (e) {
        console.log(e)
    }
}

export async function completeOrder(orderId, driverId){
    try {
        const client = intializeStitchClient()
        //Non logged in drivers should be able to complete
        if(client.auth.isLoggedIn) await client.auth.logout()
        await functionUserLogin()

        return await client.callFunction("completeOrder", [orderId.toString(), driverId.toString()]);
    } catch(e){
        console.log(e);
        return e
    }
}