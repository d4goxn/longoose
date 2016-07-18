import mongoose from "mongoose";
import {create, search} from "../src/api";
import test from "ava";

test.cb("Create a Book", t => {
	const dbName = t.title.replace(/\W+/g, "-");

	const db = mongoose.connect(`mongodb://localhost/longoose-test-${dbName}`, {
		autoIndex: true
	}, error => {
		if (error) throw(error);
	});

	const Book = mongoose.model("Book");

	create({
		title: "test title",
		chapters: ["Chapter One", "The End"]
	})
	.then(doc => {
		console.log("doc", doc);
	})
	.then(Promise.all([
		new Promise((resolve, reject) => {
			Book.esTruncate(error => {
				if (error) return reject(error);
				resolve();
			});
		}),

		new Promise((resolve, reject) => {
			db.connection.db.dropDatabase(error => {
				if (error) return reject(error);
				resolve();
			});
		})
	]))
	.then(() => {
		t.pass();
		t.end();
		db.connection.close();
	})
	.catch(error => {
		db.connection.close();
		t.fail(error);
		t.end();
	});
});
