export class CounterService {
    activeInactive: number = 0;
    inactiveActive: number = 0;

    counterAI(): void {
        this.activeInactive++;
        console.log('Active -> Inactive count: ' + this.activeInactive);
    }

    counterIA(): void {
        this.inactiveActive++;
        console.log('Inactive -> Active count: ' + this.inactiveActive);
    }
}