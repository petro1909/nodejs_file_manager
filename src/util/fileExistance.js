import fs from "fs/promises";
async function isFileExist(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch(err) {
    return false;
  }
}

export {isFileExist};