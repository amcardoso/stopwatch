const pathToHome = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
export const config = {
  databasePath: `${pathToHome}/.stopwatch`,
};