let currentDirectory;
export function setCurrentDirectory(directory) {
  currentDirectory = directory;
}
export function getCurrentDirectory() {
  return `${currentDirectory}`;
}