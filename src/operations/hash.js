import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { getCurrentDirectory } from "../util/directory.js";

async function calculateHash(filePath) {
  let hashedFileText;
  const resultPath = path.resolve(getCurrentDirectory(), filePath);
  try {
     hashedFileText = await fs.readFile(resultPath);
  } catch(err) {
    throw new Error(`Hash operation failed: \n ${err}`);
  }
  let hash = crypto.createHash("sha256");
  hash = hash.update(hashedFileText).digest("hex");
  console.log(`hash: ${hash}`);
  return hash;
}
const hashFunction = {"hash": calculateHash};
export { hashFunction };