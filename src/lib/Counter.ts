class Counter {
    private static count = 1;

    static next(): number {
        return this.count++;
    }
}

export default Counter;