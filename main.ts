import { duoLayer, layer, map, simlayer, writeToProfile } from "karabiner.ts";
import { exit } from "process";

const profileName = process.argv[2];

if (!profileName) {
  console.info("Profile name not set. \nSee README.md for the usage.\n");
  exit(1);
}

writeToProfile(profileName, [
  duoLayer("f", "⇪")
    .notification("f-layer: num+⇪ symbols and =_")
    .manipulators([
      map("m").to("1", "shift"),
      map(",").to("2", "shift"),
      map(".").to("3", "shift"),
      map("j").to("4", "shift"),
      map("k").to("5", "shift"),
      map("l").to("6", "shift"),
      map("u").to("7", "shift"),
      map("i").to("8", "shift"),
      map("o").to("9", "shift"),
      map("p").to("0", "shift"),
      map("/").to("="),
      map(";").to("-", "shift"),
    ]),
  duoLayer("␣", "⇪")
    .notification("␣-layer: num and +-")
    .manipulators([
      map("m").to("1"),
      map(",").to("2"),
      map(".").to("3"),
      map("j").to("4"),
      map("k").to("5"),
      map("l").to("6"),
      map("u").to("7"),
      map("i").to("8"),
      map("o").to("9"),
      map("p").to("0"),
      map("/").to("=", "shift"),
      map(";").to("-"),
    ]),
  layer("caps_lock")
    .notification("CapsLock Layer: Vim + []\\`{}|")
    .configKey((v) => v.toIfAlone("escape"), true)
    .modifiers("??")
    .manipulators([
      map("h").to("←"),
      map("j").to("↓"),
      map("k").to("↑"),
      map("l").to("→"),
      map("u").to("`"),
      map("i").to("["),
      map("o").to("]"),
      map("p").to("\\"),
      map("m").to("`", "shift"),
      map(",").to("[", "shift"),
      map(".").to("]", "shift"),
      map("/").to("\\", "shift"),
    ]),
]);
