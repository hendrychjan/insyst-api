import express, {Express} from "express"
import Route from "./route";
import Logger from "./logger";

/**
 * Server class that handles the Express server
 */
export default class Server {
  public port: number;
  private app: Express;

  constructor(port:number) {
    this.app = express();
    this.port = port;
  }

  /**
   * Start the server
   */
  public start(): void {
    this.app.listen(this.port, () => {
      Logger.info(`Server is running on port ${this.port}!`);
    });
  }

  /**
   * Assign a route to a specific endpoint
   * @param endpoint A string representing the endpoint of the route
   * @param route An instance of the Route class that handles the route
   */
  public useRoute(endpoint: string, route: Route): void {
    // Hook the route to the express app
    this.app.use(endpoint, route.getRouter());
    
    Logger.debug(`Defined a route at ${endpoint}`);
  }

  /**
   * Assign a middleware to the server
   * @param middleware The middleware to assign
   */
  public useMiddleware(middleware: any): void {
    this.app.use(middleware);
  }
}