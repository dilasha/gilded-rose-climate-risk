import {
  updateAgedBrie,
  updateBackstage,
  updateNormal,
  updateLegendary,
  updateConjured,
} from "./update-quality";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum ItemType {
  AgedBrie = "Aged Brie",
  Backstage = "Backstage passes to a TAFKAL80ETC concert",
  Legendary = "Sulfuras, Hand of Ragnaros",
  Conjured = "Conjured",
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemType.AgedBrie:
          updateAgedBrie(item);
          break;
        case ItemType.Backstage:
          updateBackstage(item);
          break;
        case ItemType.Legendary:
          updateLegendary(item);
          break;
        case ItemType.Conjured:
          updateConjured(item);
          break;
        default:
          updateNormal(item);
          break;
      }
    }

    return this.items;
  }
}
