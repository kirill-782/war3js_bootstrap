import { consoleLog } from "@war3js/unsafe";

export class Console {
  trace(...args: any) {
    consoleLog(1, ...args);
  }

  debug(...args: any) {
    consoleLog(2, ...args);
  }

  info(...args: any) {
    consoleLog(3, ...args);
  }

  warn(...args: any) {
    consoleLog(4, ...args);
  }

  error(...args: any) {
    consoleLog(5, ...args);
  }

  log(...args: any) {
    consoleLog(0, ...args);
  }
}
