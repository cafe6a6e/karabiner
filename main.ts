import { layer, map, writeToProfile } from "karabiner.ts";
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
    .modifiers("??")
    .manipulators([
      map('h').to("←"),
      map('j').to("↓"),
      map('k').to("↑"),
      map('l').to("→"),
      map('u').to("`"),
      map('i').to("["),
      map('o').to("]"),
      map('p').to("\\"),
      map('m').to("-"),
      map(',').to("="),
      map('⏎').to('⇪')
    ]),
]);
