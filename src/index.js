import "./mongoose-promise";
import mongoose from "mongoose";
import {create, search} from "./api";

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27019/longoose", {
	autoIndex: true
});

export create;
export search;
