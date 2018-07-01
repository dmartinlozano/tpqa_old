import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'automation'})
export class AutomationTestProjectsOptionsPipe implements PipeTransform {
    constructor() {
    }
    transform(value: string) {
        return parseInt(value.match(/"automationEnabled";i:(.*?);/)[1]);
    }
}
