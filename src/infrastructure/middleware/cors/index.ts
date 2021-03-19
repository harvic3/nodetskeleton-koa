import { Context } from "../../server/CoreModules";
import config from "../../config";

class CorsMiddleware {
  private readonly validOrigins: string[] = config.server.Origins.split(",");
  private readonly allowedMethods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  handlerOptions = {
    origin: this.verifyOrigin,
    allowMethods: this.allowedMethods,
  };

  private verifyOrigin(ctx: Context): string {
    if (ctx.headers.origin) {
      const origin: string = ctx.headers.origin;
      if (this.validOrigins.indexOf(origin) !== -1) {
        return origin;
      }
    }
    return this.validOrigins[0];
  }
}

export default new CorsMiddleware();
