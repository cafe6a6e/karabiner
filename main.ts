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
    .manipulators([
      // right hand brackets and vim cursor
      map("y").to("`"),
      map("u").to("[", "shift"),
      map("i").to("]", "shift"),
      map("o").to("9", "shift"),
      map("p").to("0", "shift"),
      map("h").to("←"),
      map("j").to("↓"),
      map("k").to("↑"),
      map("l").to("→"),
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
      // left hand symbols
      map("q").to("`", "shift"),
      map("a").to("\\"),
      map("x").to("1", "shift"),
      map("c").to("2", "shift"),
      map("v").to("3", "shift"),
      map("s").to("4", "shift"),
      map("d").to("5", "shift"),
      map("f").to("6", "shift"),
      map("w").to("7", "shift"),
      map("e").to("8", "shift"),
      map("r").to("9", "shift"),
      map("␣").to("0", "shift"),
      // left hand numbers
      map("x", "shift").to("1"),
      map("c", "shift").to("2"),
      map("v", "shift").to("3"),
      map("s", "shift").to("4"),
      map("d", "shift").to("5"),
      map("f", "shift").to("6"),
      map("w", "shift").to("7"),
      map("e", "shift").to("8"),
      map("r", "shift").to("9"),
      map("␣", "shift").to("0"),
    ]),
  rule("Trackball mouse motion").manipulators([
    mouseMotionToScroll()
      .options({
        momentum_scroll_enabled: false,
      })
      .condition(ifVar(capsLockLayerVarName)),
  ]),
]);
