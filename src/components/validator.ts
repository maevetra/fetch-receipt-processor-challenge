export class Validator {
    /**
     * Validate a receipt and make sure all fields are present
     * @param {*} receipt 
     * @returns {boolean} - True if all fields are present, false otherwise
     */
    public validate_receipt(receipt : any) : boolean {
        const retailer = receipt.retailer
        const purchase_date = receipt.purchaseDate
        const purchase_time = receipt.purchaseTime
        const total = receipt.total
        const items = receipt.items

        if(!retailer || !purchase_date || !purchase_time || !total || !items) {
            console.error("One of the category is not present")
            return false
        }

        return true
    }
}
