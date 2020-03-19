import {Stitch} from 'mongodb-stitch-browser-sdk'

function initalizeStitchClient(){
    try {
        return Stitch.initializeDefaultAppClient('stayneighbor-bjuma')
    } catch(e){
        return Stitch.defaultAppClient
    }
}

function establishStitchConnection(){
    //get default app client
    const client = initalizeStitchClient()

    if(client.errorCode) return {errorCode: '002', errorMessage: client}

    const mongodb = initalizeStitchClient(client)

    if(mongodb.errorCode) return {errorCode: '003', errorMessage: mongodb}

    return mongodb
}