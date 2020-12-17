import { PipeTransform, Pipe } from "@angular/core";

// decorator
@Pipe({
    name: 'shorten'
})

export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number, anotherParam: any) {
        if (value.length > limit) {
            return value.substr(0, limit) + '...';
        }
        return value
    }
}

// dont forget to add to app.module