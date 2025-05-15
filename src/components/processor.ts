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
        const retailer = this.receipt.retailer
        let points = 0

        for(const char of retailer) {
            if (/[a-zA-Z0-9]/.test(char)) {
                points += 1
            }
        }
        
        return points
    }

    /* 50 points if the total is a round dollar amount with no cents. */
    private get_points_for_dollar_amount() : number {
        const total_amount = this.receipt.total
        if(parseFloat(total_amount) % 1 === 0) {
            return 50
        }
        return 0

    }

    /* 25 points if the total is a multiple of 0.25. */
    private get_points_for_total_multiple() : number {
        const total_amount = this.receipt.total

        if(parseFloat(total_amount) % 0.25 === 0) {
            return 25
        }

        return 0
    }

    /* 5 points for every two items on the receipt. */
    private get_points_for_every_two_items() : number {
        return Math.floor(this.receipt.items.length / 2) * 5
    }

    /* If the trimmed length of the item description is a multiple of 3 multiply the price by 0.2 and round up to the nearest integer. 
        The result is the number of points earned. */
    private get_points_for_item_description() : number {
        let points = 0
        const items = this.receipt.items

        items.forEach((item: any) => {
            if(item.shortDescription.trim().length % 3 === 0) {
                points += Math.ceil(parseFloat(item.price) * 0.2)
            }
        })

        return points
    }

    /* 6 points if the day in the purchase date is odd. */
    private get_points_for_day_is_odd() : number {
        const purchaseDate = new Date(this.receipt.purchaseDate).toISOString().split('T', 1)[0] // ensure that purchase date is in the right format
        const date = parseInt(purchaseDate.split('-')[2])
        if(date % 2 === 1) {
            return 6
        }

        return 0
    }

    /* 10 points if the time of purchase is after 2:00pm and before 4:00pm. */
    private get_points_for_hour_of_purchase() : number {
        const hour = parseInt(this.receipt.purchaseTime.split(':')[0])
        if ( hour >= 14 && hour < 16 ) {
            return 10
        }

        return 0
    }
}