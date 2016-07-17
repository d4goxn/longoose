import mongoose from "mongoose";
import test from "ava";

(() => {
	test("Create a Db and then drop it", t => {
		t.plan(1);

		const dbName = t.title.replace(/\W+/g, "-");

		const db = mongoose.connect(`mongodb://localhost/test-${dbName}`, error => {
			if (error) {
				console.error("failed to create db", error);
				return t.fail(error);
			}

			console.log("created db");

			db.connection.db.dropDatabase(error => {
				if (error) {
					console.error("failed to drop db", error);
					return t.fail(error);
				}

				console.log("dropped db");

				t.true(true); // Plan to execute this, because is seems like the dropDatabase callback isn't called at all.
				return t.pass();
			});
		});
	});
})();
