import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {type: "string",},
    email: {type: "string", unique: true, required: true},
    password: {type: "string", required: true},
    about: {type: "string",},
    profileUpdated: {type: Boolean}
    
},
{timestamps: true}

)

const User = models.User || model("User", UserSchema);

export default User;