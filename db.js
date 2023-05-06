import {MongoClient} from "mongodb";

const Mongo_URL="mongodb://127.0.0.1:27017"
export async function createDbConnection(){
    const client=new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Mongodb is connected succesfully")
    return client
}

export const client=await createDbConnection()

