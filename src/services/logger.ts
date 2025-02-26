export default class Logger {
  // debug
  public static debug(message: string):void {
    console.log(`[DEBUG] ${message}`);
  }

  // info
  public static info(message: string):void {
    console.log(`[INFO] ${message}`);
  }

  // warn
  public static warn(message: string):void {
    console.log(`[WARN] ${message}`);
  }

  // error
  public static error(message: string):void {
    console.log(`[ERROR] ${message}`);
  }
}