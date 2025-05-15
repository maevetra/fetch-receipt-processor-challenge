import { Validator } from '../components/validator';
import { ReceiptContent } from '../types';

describe('Validator', () => {
  let validator: Validator;
  
  beforeEach(() => {
    validator = new Validator();
  });

  describe('validate_receipt', () => {
    it('should return true when all required fields are present', () => {
      // Arrange
      const validReceipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' }
        ],
        total: '18.74'
      };

      // Act
      const result = validator.validate_receipt(validReceipt);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when retailer is missing', () => {
      // Arrange
      const invalidReceipt = {
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [{ shortDescription: 'Item', price: '5.00' }],
        total: '5.00'
      } as ReceiptContent;

      // Act
      const result = validator.validate_receipt(invalidReceipt);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when purchaseDate is missing', () => {
      // Arrange
      const invalidReceipt = {
        retailer: 'Target',
        purchaseTime: '13:01',
        items: [{ shortDescription: 'Item', price: '5.00' }],
        total: '5.00'
      } as ReceiptContent;

      // Act
      const result = validator.validate_receipt(invalidReceipt);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when purchaseTime is missing', () => {
      // Arrange
      const invalidReceipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        items: [{ shortDescription: 'Item', price: '5.00' }],
        total: '5.00'
      } as ReceiptContent;

      // Act
      const result = validator.validate_receipt(invalidReceipt);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when items are missing', () => {
      // Arrange
      const invalidReceipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        total: '5.00'
      } as ReceiptContent;

      // Act
      const result = validator.validate_receipt(invalidReceipt);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when total is missing', () => {
      // Arrange
      const invalidReceipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [{ shortDescription: 'Item', price: '5.00' }]
      } as ReceiptContent;

      // Act
      const result = validator.validate_receipt(invalidReceipt);

      // Assert
      expect(result).toBe(false);
    });
  });
});