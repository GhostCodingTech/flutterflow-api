import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
        console.log("MongoDB is already connected");
        return;
    }
    if(connectionState === 2){
        console.log("MongoDB is connecting");
        return;
    }

    try {
        mongoose.connect(MONGODB_URL!, {
            dbName: "flutterflowDB",
            bufferCommands: true

        })
    } catch (err: any) {
        console.log("Error: ", err);
        throw new Error("Error: ", err);
    }
};

export default connect;