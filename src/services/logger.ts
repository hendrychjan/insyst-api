export default class Logger {
  /**
   * Log a debug message
   * @param message The message to log
   */
  public static debug(message: string):void {
    console.log(`[DEBUG] ${message}`);
  }

  /**
   * Log an info message
   * @param message The message to log
   */
  public static info(message: string):void {
    console.log(`[INFO] ${message}`);
  }

  /**
   * Log a warning
   * @param message The message to log
   */
  public static warn(message: string):void {
    console.log(`[WARN] ${message}`);
  }

  /**
   * Log a regular error
   * @param message The message to log
   */
  public static error(message: string):void {
    console.log(`[ERROR] ${message}`);
  }

  /**
   * Log a fatal error
   * @param message The message to log
   */
  public static fatal(message: string):void {
    console.log(`[FATAL] ${message}`);
  }
}