import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'inventory'})
export class InventoryTestProjectsOptionsPipe implements PipeTransform {
    constructor() {
    }
    transform(value: string) {
        return parseInt(value.match(/"inventoryEnabled";i:(.*?);/)[1]);
    }
}
