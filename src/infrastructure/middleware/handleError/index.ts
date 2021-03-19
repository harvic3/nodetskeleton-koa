import { ApplicationError } from "../../../application/shared/errors/ApplicationError";
import resources from "../../../application/shared/locals/index";
import { Context } from "../../server/CoreModules";
import { Result } from "result-tsk";
import config from "../../config";

export class HandlerErrorMiddleware {
  handler(err: ApplicationError, context: Context): void {
    const result = new Result();
    if (err?.name === "ApplicationError") {
      console.log("Controlled application error", err.message);
      result.setError(err.message, err.errorCode);
    } else {
      // Send to your log this error
      console.log("No controlled application error", err);
      result.setError(
        resources.get(config.params.defaultApplicationError.Message),
        config.params.defaultApplicationError.Code,
      );
    }
    context.status = Number(result.statusCode);
    context.body = result.toResultDto();
  }
}

export default new HandlerErrorMiddleware();
