import mongoose from "mongoose";
import Book from "./book-model";

export async function create({title, chapters}) {
	try {
		const book = new Book({title, chapters});
		await book.save();

		book.on("es-indexed", (error, esRes) => {
			if (error) return console.error("Failed to index book", error, book);
			console.log("Indexed book", esRes);
		});

		console.log("Saved book", book);
		return book;
	} catch(error) {
		console.error("Failed to save book", error);
	}
}

export function search(query) {
	return new Promise((resolve, reject) => {
		Book.search(query, {hydrate: true}, (error, results) => {
			if (error) return reject(new Error("Failed to search for book", error));

			return results;
		});
	});
}
