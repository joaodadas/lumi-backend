import path from 'path';
import { PdfInvoiceExtractor } from '../../src/extractors/PdfInvoiceExtractor';

const extractor = new PdfInvoiceExtractor();

describe('PdfInvoiceExtractor', () => {
  it('deve extrair dados corretamente de um PDF de exemplo', async () => {
    const filePath = path.resolve(__dirname, '../__mocks__/invoice-sample.pdf');
    const result = await extractor.extract(filePath);

    expect(result).toHaveProperty('clientNumber');
    expect(result).toHaveProperty('referenceMonth');
    expect(result).toHaveProperty('energyConsumed');
    expect(result).toHaveProperty('totalEnergyConsumption');
    expect(result).toHaveProperty('gdSavings');
  });
});
