import { fileFunctions } from "../operations/file.js";
import { hashFunction } from "../operations/hash.js";
import { folderFunction } from "../operations/folder.js";
import { osFunction } from "../operations/os.js";
import { zipFunctions } from "../operations/zip.js";
import { getCurrentDirectory } from "./directory.js";
import { getUserName } from "./userName.js";
import { userExit } from "./exit.js";

let commands = {};

//init functions object
Object.assign(commands, fileFunctions, hashFunction, folderFunction, osFunction, zipFunctions);


async function processingUserInput(commandLine) {
  commandLine = commandLine.toString().trim();
  if(commandLine == ".exit") {
    userExit(getUserName());
  }


  try {
    
    let commandName = commandLine.match(/^\w+\s*/);
    if(!commandName) throw new Error("Invalid input");
    commandLine = commandLine.substring(commandName[0].length);
    commandName = commandName[0].trim();
    
    const commandFunction = commands[commandName];
    if(!commandFunction) {
      throw new Error("Invalid input: unknown command");
    }

    let commandParameters = [];
    if(!commandFunction.length) {
        if(commandLine.length != 0) throw new Error("Invalid input: invalid arguments number");
    } else {
      for(let i = 0; i < commandFunction.length; i++) {
          let commandParameterResult = commandLine.match(/^('.+'\s*)/);
          if(commandParameterResult) {
            let commandParameter = commandParameterResult[0];
            commandLine = commandLine.substring(commandParameter.length);
            commandParameters[i] = commandParameter.trim().slice(1, -1);
            continue;
          }
          commandLine = commandLine + " ";
          commandParameterResult = commandLine.match(/^(.[^\s]+\s*)/);
          if(!commandParameterResult) {
            throw new Error("Invalid input: invalid arguments number");
          }
          let commandParameter = commandParameterResult[0];
          commandLine = commandLine.substring(commandParameter.length);
          commandParameters[i] = commandParameter.trim();
      }
      if(commandLine.length != 0) {
        throw new Error("Invalid input: invalid arguments number");
      }
    }
    await commandFunction(...commandParameters);
  } catch(err) {
    console.error(err);
  }
  console.log(`You are currently in ${getCurrentDirectory()}`);
}

export {processingUserInput}