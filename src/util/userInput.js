import { fileFunctions } from "../operations/file.js";
import { hashFunction } from "../operations/hash.js";
import { folderFunction } from "../operations/folder.js";
import { osFunction } from "../operations/os.js";
import { zipFunctions } from "../operations/zip.js";
import { getCurrentDirectory } from "./directory.js";

let commands = {};

//init functions object
Object.assign(commands, fileFunctions, hashFunction, folderFunction, osFunction, zipFunctions);


async function processingUserInput(commandLine) {
  commandLine = commandLine.toString().trim();
  const commandArray = commandLine.split(" ");
  const commandName = commandArray[0];
  
  let commandParameters;
  if(commandArray.length == 1) {
    commandParameters = [];
  } else {
    commandParameters = commandArray.slice(1);
  }
  try {
    const commandFunction = commands[commandName];
    if(!commandFunction) {
      throw new Error("Invalid input: unknown command");
    }
    if(commandParameters.length != commandFunction.length) {
      throw new Error("Invalid input: invalid arguments number");
    };
    await commandFunction(...commandParameters);
  } catch(err) {
    console.error(err);
  }
  console.log(`You are currently in ${getCurrentDirectory()}`);
}

export {processingUserInput}