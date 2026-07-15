import mongoose, { model, models, Schema } from "mongoose";

const SetListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: "Song",
        required: true
    }],
    description: {
        type: String,
        default: "",
        trim: true

    },
    status: {
      type: String,
      enum: ["draft", "ready", "archived"],
      default: "draft",
    },
    date: {
        type: Date,
        default: Date.now
    },
    venue: {
        type: String,
        default:"",
        trim:true
    },
    durationMin: {
        type: Number,
        default:0
    },
    isLive: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

export const SetList = models.Setlist || model("Setlist", SetListSchema)