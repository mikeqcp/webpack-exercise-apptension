export function log(message) {
    if(!__PRODUCTION__) {
        console.log(message);
    }
}
