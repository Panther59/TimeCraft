interface Array<T> {
    insertAt(index: number, ...items: Array<T>): Array<T>;
}

Array.prototype.insertAt = function ( index, ...items ) {
    return this.splice( index, 0, ...items );
};