import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'testProjectOptions'})
export class TestProjectsOptionsPipe implements PipeTransform {
    constructor() {
    }
    transform(value: string) {
        return value.match(/"requirementsEnabled";i:(.*?);/)[1];
    }
}
