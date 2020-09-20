import resources from "../../../application/shared/locals/index";
import { Context, Next } from "../../server/CoreModules";

export default function () {
  return async function (ctx: Context, next: Next): Promise<void> {
    resources.Init(ctx.headers.acceptLanguage);
    await next();
  };
}
