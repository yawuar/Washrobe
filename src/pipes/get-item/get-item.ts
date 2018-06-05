import { Pipe, PipeTransform } from "@angular/core";
import { ItemServiceProvider } from "../../providers/item-service/item-service";

@Pipe({
  name: "getItem"
})
export class GetItemPipe implements PipeTransform {
  public item: any = [];
  constructor(private itemServiceProvider: ItemServiceProvider) {}

  transform(value: string, ...args) {
    this.itemServiceProvider
      .getItemById(
        JSON.parse(localStorage.getItem("currentUser"))["token"],
        "item/get/",
        value
      )
      .then(result => {
        this.item = result;
      });

    return this.item;
  }
}
