import BaseController from "./adapters/controllers/base/BaseController";
import App from "./infrastructure/server/App";

// Region controllers
import healthController from "./adapters/controllers/health/HealthController";
import textFeelingController from "./adapters/controllers/textFeeling/TextFeelingController";
// End controllers

const controllers: BaseController[] = [healthController, textFeelingController];

const app = new App(controllers);

app.start();
