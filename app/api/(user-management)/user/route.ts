import connect from "@/lib/db";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(JSON.stringify({ message: "User Successfully created", user: newUser}), {status: 200, headers: { 'Content-Type': 'application/json'}});

    } catch (error: any) {
        return new NextResponse("Error in creating user: " + error.message, {status: 500})
    }
};

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { userId, newName, newAbout, newPassword } = body;

        await connect();

        if(!userId){
            return new NextResponse("User ID is required", {status: 400});
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse("Invalid User ID", {status: 400});
        }

        const updateData = { name: newName, password: newPassword, about: newAbout, profileUpdated: true};
        console.log("Updated data", updateData);

        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            updateData,
            { new: true }
        );

        if(!updatedUser){
            return new NextResponse("User not found", {status: 404});
        }

        return new NextResponse(JSON.stringify({ message: "User successfully updated", user: updatedUser}), {status: 200, headers: { 'Content-Type': 'application/json'}});

    } catch (error: any) {
        return new NextResponse("Error in updating user" + error.message, {status: 500});
    }
};