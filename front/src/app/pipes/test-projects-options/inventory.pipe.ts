import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'inventory'})
export class InventoryTestProjectsOptionsPipe implements PipeTransform {
    constructor() {
    }
    transform(value: string) {
        return value.match(/"inventoryEnabled";i:(.*?);/)[1];
    }
}
