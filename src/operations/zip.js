import { isFileExist } from "../util/fileExistance.js";
import zlip from "zlib";
import stream from "stream/promises";
import fs from "fs";
import path from "path";
import { getCurrentDirectory } from "../main.js";

async function compress(compressingPath, compressedPath) {
  const resultCompressingPath = path.resolve(getCurrentDirectory(), compressingPath);
  const resultCompressedPath = path.resolve(getCurrentDirectory(), compressedPath);
  
  if(!(await isFileExist(resultCompressingPath))) {
    throw new Error("comress operation failed: source file doesn't exist");
  }
  if((await isFileExist(resultCompressedPath))) {
    throw new Error("comress operation failed: destination file already exists");
  }
  try {
    const readStream = fs.createReadStream(resultCompressingPath);
    const writeStream = fs.createWriteStream(resultCompressedPath);
    const zip = zlip.createBrotliCompress(); 
    await stream.pipeline(readStream, zip, writeStream);
  } catch(err) {
    throw new Error(`Operation failed: \n ${err}`);
  }
};

async function decompress(compressedPath, decompressedPath) {
    const resultCompressedPath = path.resolve(getCurrentDirectory(), compressedPath);
    const resultDecompressedPath = path.resolve(getCurrentDirectory(), decompressedPath);
    
    if(!(await isFileExist(resultCompressedPath))) {
      throw new Error("comress operation failed: source file doesn't exist");
    }
    if((await isFileExist(resultDecompressedPath))) {
      throw new Error("comress operation failed: destination file already exists");
    }
    try {
      const readStream = fs.createReadStream(resultCompressedPath);
      const writeStream = fs.createWriteStream(resultDecompressedPath);
      const zip = zlip.createBrotliDecompress();
      await stream.pipeline(readStream, zip, writeStream);
  } catch(err) {
    throw new Error(`Operation failed: \n ${err}`);
  }
}
  

const zipFunctions = {"compress": compress, "decompress": decompress};
export {zipFunctions};

