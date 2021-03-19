import BaseController, { Context } from "../base/BaseController";
import { pongUseCase } from "./container/index";

class HealthController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get("/ping", this.pong);
  }

  pong = async (context: Context): Promise<void> => {
    this.handleResult(context, await pongUseCase.execute());
  };
}

const instance = new HealthController();

export default instance;
