import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'html2Text'})
export class Html2TextPipe implements PipeTransform {
    constructor() {
    }
    transform(value: string) {
        return value.replace(/<[^>]+>/gm, '');
    }
}
