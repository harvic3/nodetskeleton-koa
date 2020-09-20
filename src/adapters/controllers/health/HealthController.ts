import BaseController, { Context } from "../BaseController";
import { pongUseCase } from "./container/index";

class HealthController extends BaseController {
  constructor() {
    super();
    this.InitializeRoutes();
  }
  private InitializeRoutes(): void {
    this.router.get("/ping", this.Pong);
  }
  Pong = async (context: Context): Promise<void> => {
    this.HandleResult(context, await pongUseCase.Execute());
  };
}

const instance = new HealthController();

export default instance;
