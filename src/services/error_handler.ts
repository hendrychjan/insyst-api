import Logger from "./logger";

export enum ErrorType {
  DbValidationError,
  DbDuplicateKeyError,
  UserAuthError,
  Other,
}

export interface IError {
  type: ErrorType;
  message: string;
}

export default class ErrorHandler {
  /**
   * Parse a generic error
   * @param e The error to parse
   * @returns The parsed error (to IError, a structured error object with a know error type)
   */
  static parseError(e: any): IError {
    let parsedError: IError = {
      type: ErrorType.Other,
      message: e.message,
    };

    if (e.name === "ValidationError") {
      parsedError.type = ErrorType.DbValidationError;
    } else if (e.name === "MongoError" && e.code === 11000) {
      parsedError.type = ErrorType.DbDuplicateKeyError;
    } else if (e.name === "UserAuthError") {
      parsedError.type = ErrorType.UserAuthError;
    }
    
    console.log(e);

    return parsedError;
  }

  /**
   * Default route error handler - parse the error and send 400 or 500 error message
   * @param e The error to handle
   * @param res The api response object
   */
  public static handleRouteError(e: any, res: any): void {
    // Attempt to parse the generic error (coming from a catch block)
    const parsedError = ErrorHandler.parseError(e);

    // Based on the parse result, handle the error
    switch (parsedError.type) {
      // User input errors are handled with a 400 status code, and the error message
      // is provided back to the user as a hint
      case ErrorType.DbValidationError:
        res.status(400);
        res.send(parsedError.message);
        break;
      
      case ErrorType.DbDuplicateKeyError:
        res.status(400);
        res.send("The provided data violates a unique constraint.");
        break;

      case ErrorType.UserAuthError:
        res.status(400);
        res.send(parsedError.message);
        break;

      // Other errors are considered server errors (500 status code)
      // and user is provided with just a generic message,
      // while the real error message is logged for the server admins
      case ErrorType.Other:
        Logger.error(e);
        res.status(500);
        res.send("A server error occured.");
        break;
    }
  }
}
