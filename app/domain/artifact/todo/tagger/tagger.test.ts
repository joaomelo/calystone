import {
  describe,
  expect,
  it
} from "vitest";

import { Tag } from "./tag";
import { Tagger } from "./tagger";

describe("tagger", () => {
  it("can add by label", () => {
    const tagger = new Tagger();
    tagger.add("test");
    expect(tagger.has("test")).toBe(true);
  });

  it("can add by labels", () => {
    const tagger = new Tagger();
    tagger.add(["test", "example"]);
    expect(tagger.has("test")).toBe(true);
    expect(tagger.has("example")).toBe(true);
  });

  it("can add by tag", () => {
    const tagger = new Tagger();
    const tag = new Tag("test");
    tagger.add(tag);
    expect(tagger.has(tag)).toBe(true);
  });

  it("can add by tags", () => {
    const tagger = new Tagger();
    const tag1 = new Tag("test");
    const tag2 = new Tag("example");
    tagger.add([tag1, tag2]);
    expect(tagger.has(tag1)).toBe(true);
    expect(tagger.has(tag2)).toBe(true);
  });

  it("does not duplicate when adding new items", () => {
    const tagger = new Tagger();
    tagger.add("test");
    tagger.add(Tag.create("test"));
    expect(tagger.size).toBe(1);
  });

  it("can list labels in sorted order", () => {
    const tagger = new Tagger();
    tagger.add(["b", "a", "c"]);
    expect(tagger.labels).toEqual(["a", "b", "c"]);
  });

  it("can remove by label", () => {
    const tagger = new Tagger();
    tagger.add("test");
    expect(tagger.has("test")).toBe(true);
    tagger.remove("test");
    expect(tagger.has("test")).toBe(false);
  });

  it("can report if has items", () => {
    const tagger = new Tagger();
    expect(tagger.empty).toBe(true);
    tagger.add("test");
    expect(tagger.empty).toBe(false);
  });

  it("takes another tagger and returns a new one containing elements in this tagger but not in the given tagger", () => {
    const tagger1 = new Tagger();
    tagger1.add(["a", "b", "c"]);
    const tagger2 = new Tagger();
    tagger2.add(["b", "c", "d"]);
    const difference = tagger1.difference(tagger2);
    expect(difference.size).toBe(1);
    expect(difference.has("a")).toBe(true);
  });
});
