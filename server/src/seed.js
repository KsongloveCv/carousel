import "dotenv/config";
import { waitForDb, initSchema, seedDatabase, pool } from "./db.js";

const force = process.argv.includes("--force");

await waitForDb();
await initSchema();
const result = await seedDatabase({ force });
console.log(JSON.stringify(result, null, 2));
await pool.end();
