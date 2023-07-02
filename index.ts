import sqlite3InitModule from "npm:@sqlite.org/sqlite-wasm";

// import sqlite3InitModule from "https://cdn.jsdelivr.net/npm/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3-bundler-friendly.mjs";

const sqlite3 = await sqlite3InitModule({
    locateFile(file: string) {
        return "https://cdn.jsdelivr.net/npm/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm";
    },
});

// SQLite's C API
const capi = sqlite3.capi;
console.log("sqlite3 version", capi.sqlite3_libversion(), capi.sqlite3_sourceid());

// OO API example below oo1 docs https://sqlite.org/wasm/doc/tip/api-oo1.md
const oo = sqlite3.oo1;

const db = new oo.DB();
const createPersonTableSql = `
CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
);
`;
db.exec([createPersonTableSql]);

db.exec(["BEGIN TRANSACTION"]);

// Insert 10k rows
for (let i = 0; i < 10000; i++) {
    const name = `Person ${i}`;
    const age = i;
    db.exec({
        sql: `INSERT INTO person (name, age) VALUES (?, ?);`,
        bind: [name, age],
    });
}

db.exec(["COMMIT"]);

if (typeof Deno !== "undefined") {
    Deno.bench("SelectObjects", () => {
        const rows = db.selectObjects("select * from person");
    });

    Deno.bench("SelectArrays", () => {
        const rows = db.selectArrays("select * from person");
    });

    Deno.bench("Step rows, get({})", () => {
        const stmt = db.prepare("select * from person");
        while (stmt.step()) {
            stmt.get({});
        }
    });

    Deno.bench("Step rows, get([])", () => {
        const stmt = db.prepare("select * from person");
        while (stmt.step()) {
            stmt.get([]);
        }
    });
}
