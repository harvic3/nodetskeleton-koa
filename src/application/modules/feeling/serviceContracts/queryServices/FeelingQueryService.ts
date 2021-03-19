import { IFeelingQueryService } from "./IFeelingQueryService";
import { TextFeeling } from "../../../../../domain/textFeeling/TextFeeling";

export class FeelingQueryService implements IFeelingQueryService {
  private repository: IFeelingQueryService;
  public constructor(repository: IFeelingQueryService) {
    this.repository = repository;
  }
  async analyzeText(text: string): Promise<TextFeeling> {
    return await this.repository.analyzeText(text);
  }
}
