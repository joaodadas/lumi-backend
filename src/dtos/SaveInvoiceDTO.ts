export interface SaveInvoiceDTO {
  clientNumber: string;
  referenceMonth: string;
  energyConsumed: number;
  energySCEEE: number;
  compensatedEnergy: number;
  energyConsumedValue: number;
  energySCEEValue: number;
  gdSavings: number;
  publicLightingValue: number;
}
