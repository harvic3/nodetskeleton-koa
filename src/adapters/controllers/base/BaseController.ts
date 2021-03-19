import { Router, Context } from "../../../infrastructure/server/CoreModules";
import { HttpStatusResolver } from "./httpResponse/HttpStatusResolver";
export { Context } from "../../../infrastructure/server/CoreModules";
import { IResult } from "result-tsk";

export default class BaseController {
  constructor() {
    this.router = new Router();
  }
  router: Router;
  handleResult(ctx: Context, result: IResult): void {
    ctx.status = HttpStatusResolver.getCode(result.statusCode.toString());
    if (result.success) {
      ctx.body = result.message ? result.toResultDto() : result.toResultDto().data;
    } else {
      ctx.body = result.toResultDto();
    }
  }
}
