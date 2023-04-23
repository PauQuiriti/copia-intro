const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Must enter a title'],
      enum: {
        values: ['Bleach', 'In Utero','Nevermind'],
        message: 'Your title is not a  Nirvana album'
      }

    },
    description: { type: String} ,
    img: {type: String},
    yearOfRelease:{ type: Number , required: [true, 'Must enter a release year'],},
    songs:[{"title": String, "duration": String, "url": String}]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Album", AlbumSchema);