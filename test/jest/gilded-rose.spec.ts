import { Item, GildedRose, ItemType } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("normal item", () => {
    it("quality should decrease by 1 if sellIn date not passed", () => {
      const gildedRose = new GildedRose([new Item("foo", 1, 2)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(0);
      expect(item.quality).toEqual(1);
    });

    it("quality should decrease by 2 if sellIn date passed", () => {
      const gildedRose = new GildedRose([new Item("foo", -1, 5)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(-2);
      expect(item.quality).toEqual(3);
    });
    it("quality should never be negative", () => {
      const gildedRose = new GildedRose([new Item("foo", -1, 0)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(-2);
      expect(item.quality).toEqual(0);
    });
  });

  describe("aged brie", () => {
    it("quality should increase by 1 each day", () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 1, 2)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(0);
      expect(item.quality).toEqual(3);
    });

    it("quality should increase by 2 each day after sellIn passed", () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 0, 0)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(-1);
      expect(item.quality).toEqual(2);
    });

    it("quality should never be more than 50", () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 1, 50)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(0);
      expect(item.quality).toEqual(50);
    });
  });

  describe("sulfuras", () => {
    it("sellIn should never change", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Legendary, 1, 1)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(1);
    });
    it("quality should always be 80", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Legendary, 1, 1)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(1);
      expect(item.quality).toEqual(80);
    });
  });

  describe("ItemType.Backstage", () => {
    it("quality increases by 1 when sellIn date is more than 11 days away", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Backstage, 12, 1)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(11);
      expect(item.quality).toEqual(2);
    });

    it("quality increases by 2 when sellIn date is 6-10(incl.) days away", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Backstage, 10, 1)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(9);
      expect(item.quality).toEqual(3);
    });

    it("quality increases by 5 when sellIn date is 5-0(incl.) days away", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Backstage, 5, 1)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(4);
      expect(item.quality).toEqual(4);
    });

    it("quality is 0 after sellIn is passed", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Backstage, 0, 20)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(-1);
      expect(item.quality).toEqual(0);
    });

    it("quality should never be more than 50", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Backstage, 1, 50)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(0);
      expect(item.quality).toEqual(50);
    });
  });
  describe("conjured item", () => {
    it("quality should decrease by 2 if sellIn date not passed", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Conjured, 1, 4)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(0);
      expect(item.quality).toEqual(2);
    });

    it("quality should decrease by 4 if sellIn date passed", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Conjured, -1, 5)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(-2);
      expect(item.quality).toEqual(1);
    });

    it("quality should never be negative", () => {
      const gildedRose = new GildedRose([new Item(ItemType.Conjured, -1, 0)]);
      const items = gildedRose.updateQuality();
      const item = items[0];

      expect(item.sellIn).toEqual(-2);
      expect(item.quality).toEqual(0);
    });
  });
});
