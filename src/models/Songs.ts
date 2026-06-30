import mongoose , {Schema} from "mongoose";


const SongSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    bpm: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ["ready", "rehearsing", "draft"],
        default: "draft"
    },
    lyrics: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true
})

export default mongoose.models.Song || mongoose.model("Song", SongSchema);