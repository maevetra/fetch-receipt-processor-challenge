export class Processor {
    private receipt: any
    /**
     * A receipt processor to calculate points
     * @param {any} receipt - A receipt to be calculated
     */
    constructor(receipt: any) {
        this.receipt = receipt
    }

    // TODO: implement get function
    get points() {
        return 0
    }
}