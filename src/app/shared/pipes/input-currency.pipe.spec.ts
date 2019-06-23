import { InputCurrencyPipe } from './input-currency.pipe';

let pipe: InputCurrencyPipe;

describe('InputCurrencyPipe', () => {
  beforeEach(() => {
    pipe = new InputCurrencyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('no cents', () => {
    it('should convert 1 to 1,00', () => {
      const result = pipe.transform('1');

      expect(result).toBe('1,00');
    });

    it('should convert 10 to 10,00', () => {
      const result = pipe.transform('10');

      expect(result).toBe('10,00');
    });

    it('should convert 100 to 100,00', () => {
      const result = pipe.transform('100');

      expect(result).toBe('100,00');
    });

    it('should convert 1000 to 1.000,00', () => {
      const result = pipe.transform('1000');

      expect(result).toBe('1.000,00');
    });

    it('should convert 10000 to 10.000,00', () => {
      const result = pipe.transform('10000');

      expect(result).toBe('10.000,00');
    });

    it('should convert 100000 to 100.000,00', () => {
      const result = pipe.transform('100000');

      expect(result).toBe('100.000,00');
    });

    it('should convert 1000000 to 1.000.000,00', () => {
      const result = pipe.transform('1000000');

      expect(result).toBe('1.000.000,00');
    });

    it('should convert 10000000 to 10.000.000,00', () => {
      const result = pipe.transform('10000000');

      expect(result).toBe('10.000.000,00');
    });

    it('should convert 100000000 to 100.000.000,00', () => {
      const result = pipe.transform('100000000');

      expect(result).toBe('100.000.000,00');
    });

    it('should convert 1000000000 to 1.000.000.000,00', () => {
      const result = pipe.transform('1000000000');

      expect(result).toBe('1.000.000.000,00');
    });
  });

  describe('carl\'s dirty tests', () => {
    it('should convert 10.0 to 100,00', () => {
      const result = pipe.transform('10.0');

      expect(result).toBe('100,00');
    });

    it('should convert 10.00 to 1.000,00', () => {
      const result = pipe.transform('10.00');

      expect(result).toBe('1.000,00');
    });

    it('should convert 78.78 to 7.878,00', () => {
      const result = pipe.transform('78.78');

      expect(result).toBe('7.878,00');
    });

    it('should trim 0s from 001', () => {
      const result = pipe.transform('001');

      expect(result).toBe('1,00');
    });
  });

  describe('cents', () => {
    it('should convert 1, to 1,00', () => {
      const result = pipe.transform('1,');

      expect(result).toBe('1,00');
    });

    it('should convert 1,0 as 1,00', () => {
      const result = pipe.transform('1,0');

      expect(result).toBe('1,00');
    });

    it('should keep 1,00 as 1,00', () => {
      const result = pipe.transform('1,00');

      expect(result).toBe('1,00');
    });

    it('should convert 1,000 to 1,00', () => {
      const result = pipe.transform('1,000');

      expect(result).toBe('1,00');
    });
  });
});
