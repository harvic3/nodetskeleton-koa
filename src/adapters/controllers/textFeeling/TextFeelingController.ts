import { TextDto } from "../../../application/modules/feeling/dtos/TextReq.dto";
import BaseController, { Context } from "../base/BaseController";
import {
  getFeelingTextUseCase,
  getHighestFeelingSentenceUseCase,
  getLowestFeelingSentenceUseCase,
} from "./container/index";

class TextFeelingController extends BaseController {
  public constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/feeling", this.getFeelingText);
    this.router.post("/feeling/highest", this.getHighestFeelingSentence);
    this.router.post("/feeling/lowest", this.getHighestFeelingSentence);
  }

  getFeelingText = async (context: Context): Promise<void> => {
    const textDto: TextDto = context.request.body;
    this.handleResult(context, await getFeelingTextUseCase.execute(textDto));
  };

  getHighestFeelingSentence = async (context: Context): Promise<void> => {
    const textDto: TextDto = context.request.body;
    this.handleResult(context, await getHighestFeelingSentenceUseCase.execute(textDto));
  };

  getLowestFeelingSentence = async (context: Context): Promise<void> => {
    const textDto: TextDto = context.request.body;
    this.handleResult(context, await getLowestFeelingSentenceUseCase.execute(textDto));
  };
}

const instance = new TextFeelingController();

export default instance;
