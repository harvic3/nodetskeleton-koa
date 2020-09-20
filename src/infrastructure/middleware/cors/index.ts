import { Context } from "../../server/CoreModules";
import config from "../../config";

const validOrigins: string[] = config.server.origins.split(",");

function verifyOrigin(ctx: Context): string {
  if (ctx.headers.origin) {
    const origin: string = ctx.headers.origin;
    if (validOrigins.indexOf(origin) !== -1) {
      return origin;
    }
  }
  return validOrigins[0];
}

const corsOptions = {
  origin: verifyOrigin,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

export default corsOptions;
