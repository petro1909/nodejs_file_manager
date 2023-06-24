import { setCurrentDirectory, getCurrentDirectory } from "../util/directory.js";
import fs from "fs/promises";
import path from "path";

function FolderItem(name, type) {
  this.name = name;
  this.type = type;
}

async function getFileList() {
  try {
      let dirContent = await fs.readdir(getCurrentDirectory(), {withFileTypes: true});
      
      dirContent = dirContent.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name - b.name;
      }).map((item) => new FolderItem(item.name, item.isDirectory()? "directory" : "file"));
      console.table(dirContent);
  } catch(err) {
    throw new Error(`ls operation failed: \n ${err}`);
  }
}

async function cd(inputPath) {
  try {
     const resultPath = path.resolve(getCurrentDirectory(), inputPath);
     await fs.access(resultPath);
     setCurrentDirectory(resultPath);
  } catch(err) {
    throw new Error(`cd operation failder: \n ${err}`)
  }
}

async function up() {
  try {
    setCurrentDirectory(path.dirname(`${getCurrentDirectory()}`));
  } catch(err) {
    throw new Error(`up operation failed: \n ${err}`);
  }
}

const folderFunction = {"ls": getFileList, "cd": cd, "up": up};
export {folderFunction};