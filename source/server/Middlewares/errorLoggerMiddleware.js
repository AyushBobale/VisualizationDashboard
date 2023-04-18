import fs from "fs";
import path from "path";

const errorFileName = "/src/logs/error.log";
const errorFilePath = path.join(process.cwd(), errorFileName);

const deleteLogFile = () => {
  try {
    fs.unlinkSync(errorFilePath);
  } catch (error) {}
};

const deleteInterval = setInterval(() => {
  // Delete log file every day at midnight (00:00:00)
  const now = new Date();
  if (
    now.getHours() === 0 &&
    now.getMinutes() === 0 &&
    now.getSeconds() === 0
  ) {
    deleteLogFile();
  }
}, parseInt(1000 * 60 * 60 * parseInt(process.env.ACCESS_LOG_DELETION || 24)));

const errorLogger = (error, req, res, next) => {
  const { method, originalUrl, query, body, headers, ip } = req;
  const date = new Date().toISOString();
  const log = `[${date}] ${method} ${originalUrl} query=${JSON.stringify(
    query
  )} body=${JSON.stringify(body)} headers=${JSON.stringify(
    headers
  )} ip=${ip} - ${error.message}\n${error.stack}\n`;

  fs.appendFile(errorFilePath, log, (error) => {
    if (error) {
    }
  });

  next(error);
};

const errorLoggerFunction = (error) => {
  const date = new Date().toISOString();
  const log = `[${date}] ${error.message}\n${error.stack}\n`;

  fs.appendFile(errorFilePath, log, (error) => {
    if (error) {
    }
  });
};

export { errorLoggerFunction };

export default errorLogger;
