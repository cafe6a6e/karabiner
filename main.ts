import { layer, toKey, withModifier, writeToProfile } from "karabiner.ts";
import { exit } from "process";

const profileName = process.argv[2];

if (!profileName) {
  console.info("Profile name not set. \nSee README.md for the usage.\n");
  exit(1);
}

writeToProfile(profileName, [
  layer("caps_lock")
    .notification("CapsLock Layer: Vim + Efficinet symbol typings")
    .configKey((v) => v.toIfAlone("escape"), true)
    .manipulators([
      withModifier("??")({
        h: toKey("←"),
        j: toKey("↓"),
        k: toKey("↑"),
        l: toKey("→"),
        y: toKey("`"),
        u: toKey("["),
        i: toKey("]"),
        o: toKey("\\"),
        m: toKey("-"),
        n: toKey("="),
        return_or_enter: toKey("caps_lock"),
      }),
    ]),
]);
