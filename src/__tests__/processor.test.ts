import { Processor } from '../components/processor';
import { ReceiptContent } from '../types';

describe('Processor', () => {
  describe('points calculation', () => {
    it('should calculate points for retailer name correctly', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      const points = (processor as any).get_points_for_retailer_name();
      
      // Assert - 'Target' has 6 alphanumeric characters
      expect(points).toBe(6);
    });

    it('should calculate points for retailer name with special characters', () => {
      const receipt: ReceiptContent = {
        retailer: 'M&M Corner Market',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_retailer_name();
      
      // Assert - 'M&M Corner Market' has 14 alphanumeric characters
      expect(points).toBe(14);
    });

    it('should award 50 points for round dollar amount', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [],
        total: '35'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_dollar_amount();
      
      // Assert
      expect(points).toBe(50);
    });

    it('should not award points for non-round dollar amount', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [],
        total: '35.75'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_dollar_amount();
      
      // Assert
      expect(points).toBe(0);
    });

    it('should award 25 points for total being multiple of 0.25', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [],
        total: '35.75'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_total_multiple();
      
      // Assert
      expect(points).toBe(25);
    });

    it('should not award points for total not being multiple of 0.25', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [],
        total: '35.99'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_total_multiple();
      
      // Assert
      expect(points).toBe(0);
    });

    it('should award 5 points for every two items', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Item 1', price: '5.00' },
          { shortDescription: 'Item 2', price: '5.00' },
          { shortDescription: 'Item 3', price: '5.00' },
          { shortDescription: 'Item 4', price: '5.00' },
          { shortDescription: 'Item 5', price: '5.00' }
        ],
        total: '25.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_every_two_items();
      
      // Assert - 5 items should give (5/2) * 5 = 10 points
      expect(points).toBe(10);
    });

    it('should calculate points for item descriptions correctly', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'ABC', price: '10.00' }, // Length 3, multiple of 3, 10 * 0.2 = 2 points
          { shortDescription: 'ABCDEF', price: '20.00' }, // Length 6, multiple of 3, 20 * 0.2 = 4 points
          { shortDescription: 'ABCD', price: '30.00' } // Length 4, not multiple of 3, 0 points
        ],
        total: '60.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_item_description();
      
      // Assert - 2 + 4 = 6 points
      expect(points).toBe(6);
    });

    it('should award 6 points for odd purchase day', () => {
      // Arrange
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01', // 1st is odd
        purchaseTime: '13:01',
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_day_is_odd();
      
      // Assert
      expect(points).toBe(6);
    });

    it('should award 6 points for odd purchase day even if date format is not consistent', () => {
      // Arrange
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '02/03/2001', 
        purchaseTime: '13:01',
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_day_is_odd();
      
      // Assert
      expect(points).toBe(6);
    });

    it('should not award points for even purchase day', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-02', // 2nd is even
        purchaseTime: '13:01',
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_day_is_odd();
      
      // Assert
      expect(points).toBe(0);
    });

    it('should award 10 points for purchase time between 2:00pm and 4:00pm', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '14:30',
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_hour_of_purchase();
      
      // Assert
      expect(points).toBe(10);
    });

    it('should not award points for purchase time before 2:00pm', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:30', 
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_hour_of_purchase();
      
      // Assert
      expect(points).toBe(0);
    });

    it('should not award points for purchase time after 4:00pm', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '16:30', 
        items: [],
        total: '0.00'
      };
      const processor = new Processor(receipt);
      
      
      const points = (processor as any).get_points_for_hour_of_purchase();
      
      // Assert
      expect(points).toBe(0);
    });

    it('should calculate total points correctly', () => {
      const receipt: ReceiptContent = {
        retailer: 'Target', // 6 points
        purchaseDate: '2001-01-01', // odd day: 6 points
        purchaseTime: '14:30', // between 2-4pm: 10 points
        items: [
          { shortDescription: 'ABC', price: '10.00' }, // Length 3, multiple of 3: 10*0.2 = 2 points
          { shortDescription: 'ABCDEF', price: '20.00' } // Length 6, multiple of 3: 20*0.2 = 4 points
        ],
        total: '30.00' // round dollar: 50 points, multiple of 0.25: 25 points
      };
      const processor = new Processor(receipt);
      
      const points = processor.calculate_points();
      
      // Assert - 6 + 6 + 10 + 2 + 4 + 50 + 25 + 5 (for 2 items) = 108 points
      expect(points).toBe(108);
    });
  });
});