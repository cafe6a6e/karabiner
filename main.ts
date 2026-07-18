import {
  ifVar,
  layer,
  map,
  mapPointingButton,
  mouseMotionToScroll,
  rule,
  toRemoveNotificationMessage,
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
const dvorakLayerVarName = "layer-dvorak";
const dvorakNotificationId = "layer-dvorak-notification";

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
    map("␣").to("␣"),
    map("n").to("="),
  ]),
  layer("⇪", capsLockLayerVarName)
    // .configKey((v) => v.toIfAlone("[", ["control"]), true) // ESC alternative in VIM
    .configKey((v) => v.toIfAlone("escape"), true)
    .modifiers("??")
    .manipulators([
      map("f").to("left_shift"),
      map("y").to("`"),
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
      map("n").to("="),
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
  rule("Num keys").manipulators([
    map("'", "l⌘").to("="),
    map("m", "l⌘").to("1"),
    map(",", "l⌘").to("2"),
    map(".", "l⌘").to("3"),
    map("j", "l⌘").to("4"),
    map("k", "l⌘").to("5"),
    map("l", "l⌘").to("6"),
    map("u", "l⌘").to("7"),
    map("i", "l⌘").to("8"),
    map("o", "l⌘").to("9"),
    map("␣", "l⌘").to("0"),
    map("/", "l⌘").to("."),
    map(";", "l⌘").to("-"),
    map("n", "l⌘").to(","),
    map("h", "l⌘").to("/"),
    map("y", "l⌘").to("8", "shift"),
    map("p", "l⌘").to("=", "shift"),
  ]),
  rule("Mouse manipulations").manipulators([
    map("h", "⌥").toMouseKey({ x: -800 }),
    map("j", "⌥").toMouseKey({ y: 800 }),
    map("k", "⌥").toMouseKey({ y: -800 }),
    map("l", "⌥").toMouseKey({ x: 800 }),
    map("␣", "⌥").toMouseKey({ speed_multiplier: 5 }),
    map("m", "⌥").toMouseKey({ vertical_wheel: 36 }),
    map(",", "⌥").toMouseKey({ vertical_wheel: -36 }),
    map("m", "⌥", "shift").toMouseKey({ horizontal_wheel: 36 }),
    map(",", "⌥", "shift").toMouseKey({ horizontal_wheel: -36 }),
    map("u", "⌥").toPointingButton("button1"),
    map("i", "⌥").toPointingButton("button2"),
    map("o", "⌥").toPointingButton("button3"),
    map("f", "⌥").toPointingButton("button1"),
    map("d", "⌥").toPointingButton("button2"),
    map("s", "⌥").toPointingButton("button3"),
  ]),
  rule("Enter, Delete and Input changes").manipulators([
    map("[", null, "any").to("⌫"),
    map("'", null, "any").to("⏎"),
    map("[", "⌥", "any").to("⌫"),
    map("'", "⌥", "any").to("⏎"),
    map("r⌘").toIfAlone("␣", "r⌃").to("r⌘"),
  ]),
  // Toggle the Dvorak layer with Option+Esc and briefly show the active layer
  // name. The delayed action removes the notification after ~1s (or on the next
  // key press, whichever comes first) so the badge only flashes.
  rule("Toggle Dvorak layer").manipulators([
    map("escape", "⌥")
      .condition(ifVar(dvorakLayerVarName, 0))
      .toVar(dvorakLayerVarName, 1)
      .toNotificationMessage(dvorakNotificationId, "⌨ Dvorak")
      .toDelayedAction(
        toRemoveNotificationMessage(dvorakNotificationId),
        toRemoveNotificationMessage(dvorakNotificationId),
      )
      .parameters({ "basic.to_delayed_action_delay_milliseconds": 1000 }),
    map("escape", "⌥")
      .condition(ifVar(dvorakLayerVarName, 1))
      .toVar(dvorakLayerVarName, 0)
      .toNotificationMessage(dvorakNotificationId, "⌨ QWERTY")
      .toDelayedAction(
        toRemoveNotificationMessage(dvorakNotificationId),
        toRemoveNotificationMessage(dvorakNotificationId),
      )
      .parameters({ "basic.to_delayed_action_delay_milliseconds": 1000 }),
  ]),
  // Remap QWERTY physical keys to Dvorak output while the layer is active.
  // Shift/command/control pass through so capitals and ⌘/⌃ shortcuts follow the
  // Dvorak layout. Option is intentionally excluded so the ⌥ mouse layer keeps
  // working on physical keys.
  rule("Dvorak layer", ifVar(dvorakLayerVarName, 1)).manipulators([
    // number row
    map("-", null, "⌘⌃⇧").to("["),
    map("=", null, "⌘⌃⇧").to("]"),
    // top row
    map("q", null, "⌘⌃⇧").to("/"),
    map("w", null, "⌘⌃⇧").to(","),
    map("e", null, "⌘⌃⇧").to("."),
    map("r", null, "⌘⌃⇧").to("p"),
    map("t", null, "⌘⌃⇧").to("y"),
    map("y", null, "⌘⌃⇧").to("f"),
    map("u", null, "⌘⌃⇧").to("g"),
    map("i", null, "⌘⌃⇧").to("c"),
    map("o", null, "⌘⌃⇧").to("r"),
    map("p", null, "⌘⌃⇧").to("l"),
    map("[", null, "⌘⌃⇧").to("/"),
    map("]", null, "⌘⌃⇧").to("="),
    // home row
    map("s", null, "⌘⌃⇧").to("o"),
    map("d", null, "⌘⌃⇧").to("e"),
    map("f", null, "⌘⌃⇧").to("u"),
    map("g", null, "⌘⌃⇧").to("i"),
    map("h", null, "⌘⌃⇧").to("d"),
    map("j", null, "⌘⌃⇧").to("h"),
    map("k", null, "⌘⌃⇧").to("t"),
    map("l", null, "⌘⌃⇧").to("n"),
    map(";", null, "⌘⌃⇧").to("s"),
    map("'", null, "⌘⌃⇧").to("-"),
    // bottom row
    map("z", null, "⌘⌃⇧").to(";"),
    map("x", null, "⌘⌃⇧").to("q"),
    map("c", null, "⌘⌃⇧").to("j"),
    map("v", null, "⌘⌃⇧").to("k"),
    map("b", null, "⌘⌃⇧").to("x"),
    map("n", null, "⌘⌃⇧").to("b"),
    map(",", null, "⌘⌃⇧").to("w"),
    map(".", null, "⌘⌃⇧").to("v"),
    map("/", null, "⌘⌃⇧").to("z"),
  ]),
]);
