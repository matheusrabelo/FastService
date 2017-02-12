export class redisMock {
    public published: any[];
    public values: any;
    public config: any;
    public error: any;

    constructor(config: any) {
        this.config = config;
        this.values = {};
        this.published = new Array();
    }

    public set(key: any, value: any): void {
        this.values.key = value;
    }
    
    public get(key: any, callback: (err: boolean, result: string) => void): any {
        return callback(true, this.values.key);
    }

    public publish(key: any, value: any): any {
        this.published.push({
            key, value
        });
    }

    public on(message: string, callback: () => void): void {

    }

    public subscribe(key: string, callback: (err: boolean, count: number) => void): any {
        return callback(true, 1);
    }
}
