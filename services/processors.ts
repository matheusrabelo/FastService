export function getValue(unprocessedValue: string): any {
    let value: any;
    try {
        value = JSON.parse(unprocessedValue);
    } catch (e) {
        value = unprocessedValue;
    } finally {
        return value;
    }
}

export function setValue(unprocessedValue: any): string {
    let value: string = '';
    try {
        value = JSON.stringify(unprocessedValue);
    } catch (e) {
        value = '';
    } finally {
        return value;
    }
}