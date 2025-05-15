import { Receipt, ReceiptContent } from '../components/receipt';
import { Processor } from '../components/processor';
import { Validator } from '../components/validator';

// Mock dependencies
jest.mock('../components/processor');
jest.mock('../components/validator');

describe('Receipt', () => {
  let mockReceiptContent: ReceiptContent;
  
  beforeEach(() => {
    mockReceiptContent = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
        { shortDescription: 'Emils Cheese Pizza', price: '12.25' }
      ],
      total: '18.74'
    };
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with id and content', () => {
      // Arrange & Act
      const receipt = new Receipt('test-id', mockReceiptContent);
      
      // Assert
      expect(receipt.id).toBe('test-id');
      expect(receipt.content).toBe(mockReceiptContent);
    });
  });

  describe('process', () => {
    it('should create a processor and return points', () => {
      // Arrange
      const receipt = new Receipt('test-id', mockReceiptContent);
      const mockPoints = 100;
      
      // Mock the Processor implementation
      const mockCalculatePointsMethod = jest.fn().mockReturnValue(mockPoints);
      (Processor as jest.MockedClass<typeof Processor>).mockImplementation(() => {
        return {
          calculate_points: mockCalculatePointsMethod
        } as any;
      });
      
      // Act
      const result = receipt.points;
      
      // Assert
      expect(Processor).toHaveBeenCalledWith(mockReceiptContent);
      expect(result).toBe(mockPoints);
    });
  });

  describe('validate', () => {
    it('should create a validator and validate the receipt', () => {
      const receipt = new Receipt('test-id', mockReceiptContent);
      
      // Mock the Validator implementation
      const mockValidateMethod = jest.fn().mockReturnValue(true);
      (Validator as jest.MockedClass<typeof Validator>).mockImplementation(() => {
        return {
          validate_receipt: mockValidateMethod
        } as any;
      });
      
      
      const result = receipt.isReceiptValid;
      
      // Assert
      expect(Validator).toHaveBeenCalled();
      expect(mockValidateMethod).toHaveBeenCalledWith(mockReceiptContent);
      expect(result).toBe(true);
    });

    it('should return false when validation fails', () => {
      const receipt = new Receipt('test-id', mockReceiptContent);
      
      // Mock the Validator implementation
      const mockValidateMethod = jest.fn().mockReturnValue(false);
      (Validator as jest.MockedClass<typeof Validator>).mockImplementation(() => {
        return {
          validate_receipt: mockValidateMethod
        } as any;
      });
      
      // Act
      const result = receipt.isReceiptValid;
      
      // Assert
      expect(result).toBe(false);
    });
  });
});