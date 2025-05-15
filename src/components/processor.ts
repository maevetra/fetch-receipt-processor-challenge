import { ReceiptContent } from "../types"

export class Processor {
    private receipt: ReceiptContent
    /**
     * A receipt processor to calculate points
     * @param {ReceiptContent} receipt - Content of a receipt to be calculated
     */
    constructor(receiptContent: ReceiptContent) {
        this.receipt = receiptContent
    }

    /**
     * Calculate the total points of the receipt
     * @returns {number} - The total points of the receipt
     */
    calculate_points() : number {
        return this.get_points_for_retailer_name() 
            + this.get_points_for_dollar_amount()
            + this.get_points_for_total_multiple()
            + this.get_points_for_every_two_items()
            + this.get_points_for_item_description()
            + this.get_points_for_day_is_odd()
            + this.get_points_for_hour_of_purchase()
    } 

    /* One point for every alphanumeric character in the retailer name. */
    private get_points_for_retailer_name() : number {
        throw Error('Function is not implemented')
    }

    /* 50 points if the total is a round dollar amount with no cents. */
    private get_points_for_dollar_amount() : number {
        // TODO: implement function
        throw Error('Function is not implemented')

    }

    /* 25 points if the total is a multiple of 0.25. */
    private get_points_for_total_multiple() : number {
        // TODO: implement function
        throw Error('Function is not implemented')
    }

    /* 5 points for every two items on the receipt. */
    private get_points_for_every_two_items() : number {
        // TODO: implement function
        throw Error('Function is not implemented')
    }

    /* If the trimmed length of the item description is a multiple of 3 multiply the price by 0.2 and round up to the nearest integer. 
        The result is the number of points earned. */
    private get_points_for_item_description() : number {
        // TODO: implement function
        throw Error('Function is not implemented')
    }

    /* 6 points if the day in the purchase date is odd. */
    private get_points_for_day_is_odd() : number{
        // TODO: implement function
        throw Error('Function is not implemented')
    }

    /* 10 points if the time of purchase is after 2:00pm and before 4:00pm. */
    private get_points_for_hour_of_purchase() : number {
        // TODO: implement function
        throw Error('Function is not implemented')
    }
}