import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'priority'})
export class PriorityTestProjectsOptionsPipe implements PipeTransform {
    constructor() {
    }
    transform(value: string) {
        return parseInt(value.match(/"testPriorityEnabled";i:(.*?);/)[1]);
    }
}
