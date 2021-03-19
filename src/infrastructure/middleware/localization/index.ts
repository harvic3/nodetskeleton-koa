import resources from "../../../application/shared/locals/index";
import { Context, Next } from "../../server/CoreModules";
import config from "../../config";

export class LocalizationMiddleware {
  handler(ctx: Context, next: Next): Promise<void> {
    const requestLanguage = ctx.headers?.acceptLanguage?.length
      ? ctx.headers.acceptLanguage[0]
      : (ctx.headers?.acceptLanguage as string);
    const language = requestLanguage || config.params.DefaultLang;
    resources.init(language);
    return next();
  }
}

export default new LocalizationMiddleware();
