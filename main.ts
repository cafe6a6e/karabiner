import {
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
const tabLayerVarName = "layer-tab";

writeToProfile(profileName, [
  layer("tab", tabLayerVarName).manipulators([
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
  ]),
  layer("⇪", capsLockLayerVarName)
    .configKey((v) => v.toIfAlone("[", ["control"]), true) // ESC alternative in VIM
    .modifiers("??")
    .manipulators([
      map("f").to("left_shift"),
      map("u").to("["),
      map("i").to("]"),
      map("o").to("9", "shift"),
      map("p").to("0", "shift"),
      map("h").to("←"),
      map("j").to("↓"),
      map("k").to("↑"),
      map("l").to("→"),
      map(";").to("-"),
      map("'").to("="),
      map("n").to("`"),
      map("m").to("'"),
      map("/").to("\\"),
      mapPointingButton("button1").to("←", "command"),
      mapPointingButton("button2").to("→", "command"),
      mapPointingButton("button3").to("mission_control"),
    ]),
  rule("Trackball mouse motion").manipulators([
    mouseMotionToScroll()
      .options({
        momentum_scroll_enabled: false,
      })
      .condition(ifVar(capsLockLayerVarName)),
  ]),
  rule("Delete & Enter & Num key").manipulators([
    map("[").to("⌫"),
    map("'").to("⏎"),
    map("m", "⌥").to("1"),
    map(",", "⌥").to("2"),
    map(".", "⌥").to("3"),
    map("j", "⌥").to("4"),
    map("k", "⌥").to("5"),
    map("l", "⌥").to("6"),
    map("u", "⌥").to("7"),
    map("i", "⌥").to("8"),
    map("o", "⌥").to("9"),
    map("␣", "⌥").to("0"),
    map("/", "⌥").to("."),
  ]),
]);
