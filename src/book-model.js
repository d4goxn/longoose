import mongoose from "mongoose";
import mongoosastic from "mongoosastic";

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		index: true,
		es_indexed: true
	},
});


BookSchema.plugin(mongoosastic);

const BookModel = mongoose.model("Book", BookSchema);

BookModel.createMapping((error, mapping) => {
	if (error) return console.error("Failed to create Elasticsearch mapping for Book. It could be that the mapping already exists.", error);

	console.log("Mapping created", mapping);
});

export default BookModel;
