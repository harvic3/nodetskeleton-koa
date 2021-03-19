import { ITextFeelingService } from "../../serviceContracts/textFeeling/ITextFeelingService";
import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { Sentence } from "../../../../../domain/sentence/Sentence";
import { TextDto } from "../../dtos/TextReq.dto";

export class UseCaseGetLowestFeelingSentence extends BaseUseCase {
  public constructor(private readonly textFeelingService: ITextFeelingService) {
    super();
  }

  async execute(textDto: TextDto): Promise<IResultT<Sentence>> {
    const result = new ResultT<Sentence>();
    if (!this.validator.isValidEntry(result, { textDto: textDto, text: textDto?.text })) {
      return result;
    }
    const sentence = await this.textFeelingService.getLowestFeelingSentence(textDto.text);
    if (!sentence) {
      result.setError(
        this.resources.get(this.resourceKeys.TEXT_FEELING_SERVICE_ERROR),
        this.applicationStatusCode.INTERNAL_SERVER_ERROR,
      );
      return result;
    }
    result.setData(sentence, this.applicationStatusCode.SUCCESS);
    return result;
  }
}
