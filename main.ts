import {
  duoLayer,
  ifVar,
  layer,
  map,
  mapPointingButton,
  mouseMotionToScroll,
  rule,
  writeToProfile,
} from "karabiner.ts";
import { exit } from "process";

const profileName = process.argv[2];

if (!profileName) {
  console.info("Profile name not set. \nSee README.md for the usage.\n");
  exit(1);
}

const capsLockLayerVarName = "layer-caps_lock";

writeToProfile(profileName, [
  layer("⇪", capsLockLayerVarName)
    .configKey((v) => v.toIfAlone("[", ["control"]), true) // ESC alternative in VIM
    .modifiers("??")
    .manipulators([
      // right hand symbols
      map("y").to("`"),
      map("u").to("[", "shift"),
      map("i").to("]", "shift"),
      map("o").to("9", "shift"),
      map("p").to("0", "shift"),
      map(";").to("-"),
      map("'").to("="),
      map("n").to("\\", "shift"),
      map("m").to("-", "shift"),
      map(",").to("["),
      map(".").to("]"),
      map("/").to("=", "shift"),
      mapPointingButton("button1").to("←", "command"),
      mapPointingButton("button2").to("→", "command"),
      mapPointingButton("button3").to("mission_control"),

      // right hand vim
      map("h").to("←"),
      map("j").to("↓"),
      map("k").to("↑"),
      map("l").to("→"),

      // left hand symbols
      map("f").to("`", "shift"),
      map("r").to("\\"),
      map("z").to("1"),
      map("x").to("2"),
      map("c").to("3"),
      map("a").to("4"),
      map("s").to("5"),
      map("d").to("6"),
      map("q").to("7"),
      map("w").to("8"),
      map("e").to("9"),
    ]),
  rule("Trackball mouse motion").manipulators([
    mouseMotionToScroll()
      .options({
        momentum_scroll_enabled: false,
      })
      .condition(ifVar(capsLockLayerVarName)),
  ]),
]);
