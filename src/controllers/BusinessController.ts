import { Request, Response } from 'express';
import { BusinessService } from '../services/BusinessService';
import { BusinessModel } from '../models/Business';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/lib/Either';

// Controller handling HTTP requests
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  create(req: Request, res: Response): void {
    const { fein, name } = req.body;
    const result = this.businessService.createBusiness(fein, name);
    pipe(
      result,
      E.match(
        (error) => res.status(400).json({ error: error.message }),
        (business) => res.status(201).json(business)
      )
    );
  }

  transition(req: Request, res: Response): void {
    const { fein, name, classification, phoneNumber, xMod, stage } = req.body;
    const business = new BusinessModel(fein, name, classification, phoneNumber, xMod, stage);
    const result = this.businessService.transitionBusiness(business);
    pipe(
      result,
      E.match(
        (error) => res.status(400).json({ error: error.message }),
        (updatedBusiness) => res.status(200).json(updatedBusiness)
      )
    );
  }
}
