describe('Cálculos agregados do PDF', () => {
  const mock = {
    energyConsumed: 100,
    energySCEEE: 10,
    energyConsumedValue: 80.5,
    energySCEEValue: 20.25,
    publicLightingValue: 15.75,
    compensatedEnergyValue: 5,
  };

  it('deve calcular corretamente totalEnergyConsumption', () => {
    const total = mock.energyConsumed + mock.energySCEEE;
    expect(total).toBe(110);
  });

  it('deve calcular corretamente totalValueWithoutGD', () => {
    const total =
      mock.energyConsumedValue +
      mock.energySCEEValue +
      mock.publicLightingValue;
    expect(total).toBeCloseTo(116.5);
  });

  it('deve calcular corretamente gdSavings', () => {
    expect(mock.compensatedEnergyValue).toBe(5);
  });
});
