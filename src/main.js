import { setCurrentDirectory, getCurrentDirectory } from "./util/directory.js";
import { processingUserInput } from "./util/userInput.js";
import os from "os";


function start() {
  if(process.argv.length < 3) {
    console.error("there is no user name");
    process.exit(0);
  }
  const args = process.argv.slice(2);
  const user = args[0].split("=");
  if(user[0] !== "--username" || user[1] == "") {
    console.error("there is no user name");
    process.exit(0);
  }
  const userName = user[1];

  setCurrentDirectory(os.homedir());
  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${getCurrentDirectory()}`);

  process.stdin.on("data", processingUserInput);
  process.stdin.on("exit", () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`));
}
start();