import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {
    constructor() {}
    transform(value: string) {
      return moment(value, "YYYY-MM-DD").format("DD/MM/YYYY")
    }
}
