export type Classification = {
  bureau: string;
  classCode: string;
};

export enum Stage {
  New = 'New',
  MarketDeclined = 'Market Declined',
  SalesDeclined = 'Sales Declined',
  SalesApproved = 'Sales Approved'
}

export interface Business {
  fein: string;
  name: string;
  classification?: Classification;
  phoneNumber?: string;
  xMod?: number;
  stage: Stage;
}
