import { Processor, Validator } from "../types"

export type ReceiptContent = {
    retailer: string
    purchaseDate: string
    purchaseTime: string
    items: any
    total: number
}

export class Receipt {
    public id: string
    public content: ReceiptContent
    /**
     * Represents a receipt
     * @constructor
     * @param {string} id - The id of the receipt 
     * @param {ReceiptBody} content - The content of the receipt
     */
    constructor(id: string, content: ReceiptContent) {
        this.id = id
        this.content = content
    }

    /**
     * Returns the points of the receipt
     * @returns {number} The points of the receipt
     */
    get points() : number {
        return this.process()
    }

    /**
     * Returns the validity of the receipt
     * @returns {boolean} The validity of the receipt
     */
    get isReceiptValid() : boolean {
        return this.validate()
    }

    /**
     * Returns the points of the receipt
     * @returns {number} The points of the receipt
     * @private
     */
    private process() {
        const processor = new Processor(this.content)
        return processor.calculate_points()
    }

    /**
     * Returns the validity of the receipt
     * @returns {boolean} The validity of the receipt
     * @private
     */
    private validate() {
        const validator = new Validator()
        return validator.validate_receipt(this.content)
    }
}