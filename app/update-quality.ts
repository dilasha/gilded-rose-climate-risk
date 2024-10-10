import { Item } from "./gilded-rose";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LEGENDARY_QUALITY = 80;

const increaseQuality = (quality: number, incrementBy: number = 1): number =>
  Math.min(MAX_QUALITY, quality + incrementBy); //quality never more than max

const decreaseQuality = (quality: number, decrementBy: number = 1): number =>
  Math.max(MIN_QUALITY, quality - decrementBy); // quality never less than min

export const updateNormal = (item: Item) => {
  item.quality = decreaseQuality(item.quality);

  item.sellIn--;

  if (item.sellIn < 0) {
    item.quality = decreaseQuality(item.quality);
  }
};

export const updateAgedBrie = (item: Item) => {
  item.quality = increaseQuality(item.quality);

  item.sellIn--;

  if (item.sellIn < 0) {
    item.quality = increaseQuality(item.quality);
  }
};

export const updateBackstage = (item: Item) => {
  item.quality = increaseQuality(item.quality);

  // 6-10 days before sell
  if (item.sellIn < 11) {
    item.quality = increaseQuality(item.quality);
  }
  // 0-5 days before sell
  if (item.sellIn < 6) {
    item.quality = increaseQuality(item.quality);
  }

  item.sellIn--;

  // backstage quality 0 after concert is passed
  if (item.sellIn < 0) {
    item.quality = 0;
  }
};

export const updateLegendary = (item: Item) => {
  item.quality = LEGENDARY_QUALITY;
};

export const updateConjured = (item: Item) => {
  // decreases twice as fast as normal
  item.quality = decreaseQuality(item.quality, 2);

  item.sellIn--;

  if (item.sellIn < 0) {
    item.quality = decreaseQuality(item.quality, 2);
  }
};
