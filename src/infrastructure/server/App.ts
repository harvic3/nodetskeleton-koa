import BaseController from "../../adapters/controllers/base/BaseController";
import localizationMiddleware from "../middleware/localization";
import handlerErrorMiddleware from "../middleware/handleError";
import resources from "../../application/shared/locals/index";
import { Server, bodyParser, cors } from "./CoreModules";
import corsMiddleware from "../middleware/cors/index";
import config from "../config";

export default class App {
  public app: Server;

  constructor(controllers: BaseController[]) {
    this.app = new Server();
    this.loadMiddleware();
    this.loadControllers(controllers);
    this.loadHandleError();
    this.setups();
  }

  public loadMiddleware(): void {
    this.app.use(cors(corsMiddleware.handlerOptions));
    this.app.use(bodyParser());
    this.app.use(localizationMiddleware.handler);
  }

  private loadControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      controller.router.prefix(config.server.Root);
      this.app.use(controller.router.routes());
      this.app.use(controller.router.allowedMethods());
    });
  }

  private loadHandleError(): void {
    this.app.on("error", handlerErrorMiddleware.handler);
  }

  private setups(): void {
    resources.setDefaultLanguage(config.params.DefaultLang);
  }

  private listen(): void {
    this.app.listen(config.server.Port, () => {
      console.log(
        `Server running on ${config.server.Host}:${config.server.Port}${config.server.Root}`,
      );
    });
  }

  private runServices(): void {
    // Initialize db and other services here and once started run Listen
    this.listen();
  }

  public start(): void {
    this.runServices();
  }
}
