export class Receipt {
    public id: string
    public content: any
    /**
     * Represents a receipt
     * @constructor
     * @param {string} id - The id of the receipt 
     * @param {ReceiptBody} content - The content of the receipt
     */
    constructor(id: string, content: any) {
        this.id = id
        this.content = content
    }

    // TODO: implement get function
    get points() {
        return 0
    }

    
}