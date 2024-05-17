import * as E from 'fp-ts/Either';
import { BusinessModel } from '../models/Business';

// Business service handling the business logic
export class BusinessService {
  createBusiness(fein: string, name: string): E.Either<Error, BusinessModel> {
    return BusinessModel.create(fein, name);
  }

  transitionBusiness(business: BusinessModel): E.Either<Error, BusinessModel> {
    return business.transitionToNextStage();
  }
}
