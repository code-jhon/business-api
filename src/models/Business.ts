import * as E from 'fp-ts/Either';
import { Stage, Classification } from '../types';

// Business model with state transitions
export class BusinessModel {
  constructor(
    public fein: string,
    public name: string,
    public classification?: Classification,
    public phoneNumber?: string,
    public xMod?: number,
    public stage: Stage = Stage.New
  ) {}

  static create(fein: string, name: string): E.Either<Error, BusinessModel> {
    if (!fein || !name) {
      return E.left(new Error('FEIN and Name are required'));
    }
    return E.right(new BusinessModel(fein, name));
  }

  transitionToNextStage(): E.Either<Error, BusinessModel> {
    // Logic to transition to the next stage
    switch (this.stage) {
      case Stage.New:
        if (this.classification && this.isApprovedClassCode()) {
          this.stage = Stage.SalesDeclined;
        } else {
          this.stage = Stage.MarketDeclined;
        }
        break;
      case Stage.MarketDeclined:
      case Stage.SalesDeclined:
        if (this.phoneNumber && this.xMod) {
          this.stage = Stage.SalesApproved;
        } else {
          return E.left(new Error('Valid phone number and xMod are required'));
        }
        break;
      default:
        return E.left(new Error('Invalid stage transition'));
    }
    return E.right(this);
  }

  private isApprovedClassCode(): boolean | undefined {
    const approvedClassCodes = ['9079', '8078'];
    return this.classification && approvedClassCodes.includes(this.classification.classCode) ;
  }
}
