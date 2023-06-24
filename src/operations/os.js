import os from "os";
const parameters = { "EOL": `current EOL is '${JSON.stringify(os.EOL)}'`, 
                     "cpus": getCpusInfo(), 
                     "homedir": `current homedir is ${os.homedir()}`, 
                     "username": `username is ${os.userInfo().username}`, 
                     "architecture": `architecture is ${os.arch()}` };

function getOSInfo(inputParameter) {
  const parameter = inputParameter.slice(2); 
  if(!parameters[parameter]) {
    throw new Error(`Invalid os input parameter: ${inputParameter}`);
  }
  console.log(parameters[parameter]);
}

function getCpusInfo() {
  let cpus = os.cpus();
  const cpusCount = cpus.length;
  cpus = cpus.map((item) => { 
    let newItem = { model: item.model, speed: `${(item.speed / 1000).toFixed(1)} GHz` }
    return newItem; 
  });

  return {
    cpusCount,
    cpus
  }
}
const osFunction = {"os": getOSInfo};
export {osFunction};