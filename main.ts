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
const fKeyLayerVarName = "layer-f";
const gKeyLayerVarName = "layer-g";

writeToProfile(profileName, [
  duoLayer("f", "⇪", fKeyLayerVarName)
    .notification("⇪f-layer: num+⇪ symbols and =_")
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
  duoLayer("g", "⇪", gKeyLayerVarName)
    .notification("⇪g-layer: num and +-")
    .manipulators([
      map("␣").to("0"),
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
      map("p").to("8", "shift"),
    ]),
  layer("⇪", capsLockLayerVarName)
    .notification("⇪-Layer: ←↓↑→ ()[]{} `| -= _+ \\~ ")
    .configKey((v) => v.toIfAlone("escape"), true)
    .modifiers("??")
    .manipulators([
      map("q").to("`", "shift"),
      map("a").to("\\"),
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
      map("m").to("["),
      map(",").to("]"),
      map(".").to("-", "shift"),
      map("/").to("=", "shift"),
      mapPointingButton("button1").to("←", "command"),
      mapPointingButton("button2").to("→", "command"),
      mapPointingButton("button3").to("mission_control"),
      map("f").toVar(fKeyLayerVarName, 1, 0),
      map("g").toVar(gKeyLayerVarName, 1, 0),
    ]),
  rule("Trackball mouse motion").manipulators([
    mouseMotionToScroll()
      .options({
        momentum_scroll_enabled: false,
      })
      .condition(ifVar(capsLockLayerVarName)),
  ]),
]);
