class Counter {
    private static count = 0;

    static next(): number {
        return this.count++;
    }
}

export default Counter;