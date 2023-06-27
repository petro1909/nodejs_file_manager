import { isFileExist } from "../util/fileExistance.js";
import fs from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { getCurrentDirectory } from "../util/directory.js";


async function read(filePath) {
  try {
    return new Promise((resolve, reject) => {
        const resultFilePath = path.resolve(getCurrentDirectory(), filePath);
        const readStream = createReadStream(resultFilePath);
        readStream.on("data", (chunk) => console.log(chunk.toString()) );
        readStream.on("error", () => reject(new Error("read operation failed")));
        readStream.on("end", () => resolve());
    });
  } catch(err) {
    throw new Error(`read operation failed, ${err}`);
  }
}

async function create(filePath) {
  try {
    const resultFilePath = path.resolve(getCurrentDirectory(), filePath);
    await fs.open(resultFilePath, "w");
  } catch(err) {
    throw new Error(`create operation failed: ${err}`);
  }
}

async function rename(filePath, newName) {
  const resultFilePath = path.resolve(getCurrentDirectory(), filePath);
  if (!(await isFileExist(resultFilePath))) {
    throw new Error(`raname operation failed: file ${resultFilePath} doesn't exist`);
  }

  const fileDirectory = path.dirname(resultFilePath);
  const newPath = path.join(fileDirectory, newName);

  if (await isFileExist(newPath)) {
    throw new Error(`raname operation failed: file ${newPath} already exist`);
  }

  try {
    await fs.rename(resultFilePath, newPath);
  } catch(err) {
    throw new Error(`rename operation failed: ${err}`);
  }
}

async function copy(fileFromPath, fileToPath) {
  const resultFileFromPath = path.resolve(getCurrentDirectory(), fileFromPath);
  const resultFileToPath = path.resolve(getCurrentDirectory(), fileToPath, path.basename(fileFromPath));
  
  if (!(await isFileExist(resultFileFromPath))) {
    throw new Error(`copy operation failed: ${resultFileFromPath} doesn't exist`);
  }
  if (await isFileExist(resultFileToPath)) {
    throw new Error(`copy operation failed: ${resultFileToPath} already exist`);
  }

  try {
    const readStream = createReadStream(resultFileFromPath);
    const writeStream = createWriteStream(resultFileToPath);
    await pipeline(readStream, writeStream);
  } catch(err) {
    throw new Error(`copy operation failed, ${err}`);
  }
}
async function move(fileFromPath, fileToPath) {
  try {
    await copy(fileFromPath, fileToPath);
    await remove(fileFromPath);
  } catch(err) {
    throw new Error(err);
  }
}

async function remove(filePath) {
  try {
    const resultPath = path.resolve(getCurrentDirectory(), filePath);
    await fs.rm(resultPath); 
  } catch(err) {
    throw new Error(`remove operation failed: \n ${err}`);
  }
}
const fileFunctions = {"cat": read, "add": create, "rn": rename, "cp": copy, "mv": move, "rm": remove}

export {fileFunctions};