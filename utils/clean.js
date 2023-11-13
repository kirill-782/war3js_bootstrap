import fs from "fs";

fs.rmSync("./build", { recursive: true, force: true });
