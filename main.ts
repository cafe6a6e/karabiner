import {
  ifVar,
  layer,
  map,
  mapPointingButton,
  mouseMotionToScroll,
  rule,
  toRemoveNotificationMessage,
  withCondition,
  writeToProfile,
} from "karabiner.ts";
import { exit } from "process";

const profileName = process.argv[2];

if (!profileName) {
  console.error("Profile name not set.\nSee README.md for the usage.\n");
  exit(1);
}

const capsLockLayerVarName = "layer-caps_lock";
const tabLayerVarName = "layer-tab";
const dvorakLayerVarName = "layer-dvorak";
const dvorakNotificationId = "layer-dvorak-notification";

const mouseMoveSpeed = 800;
const mouseSpeedMultiplier = 5;
const mouseScrollSpeed = 36;

// Layout conventions:
// - Only left ⌥ switches layers (mouse keys, Dvorak toggle); right ⌥ is plain ⌥.
// - Left ⌘ is a numpad layer (see "Num keys"); use right ⌘ for shortcuts.
//   Tapping right ⌘ alone sends ⌃␣ (input source switch).
// - Physical [ and ' are ⌫ and ⏎. Symbols on the right edge of QWERTY are
//   moved to the Caps layer: Caps+u/i → [ ], Caps+m → ', Caps+; → -, Caps+/ → \.
// - Dvorak (toggle: left ⌥+Esc) puts / on the q key, since the Caps layer has no
//   slot for it. Caps-layer symbols stay on the same physical keys.
writeToProfile(profileName, [
  layer("tab", tabLayerVarName)
    .description(
      "Hold Tab: shifted numbers (! @ # …) on the left ⌘ numpad positions",
    )
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
    ]),
  layer("⇪", capsLockLayerVarName)
    .description(
      "Caps Lock: tap for Esc, hold for arrows (h j k l) and ` [ ] ( ) - = ' < > \\",
    )
    // .configKey((v) => v.toIfAlone("[", ["control"]), true) // ESC alternative in VIM
    .configKey((v) => v.toIfAlone("escape"), true)
    .modifiers("??")
    .manipulators([
      // Hidden: hold f for Shift without leaving the home row, e.g. Shift+arrows
      // to select text, or { } ~ _ + " | from the symbols below.
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
      map("'").to("⏎"),
      map("n").to("="),
      map("m").to("'"),
      map(",").to(",", "shift"),
      map(".").to(".", "shift"),
      map("/").to("\\"),
      mapPointingButton("button1").to("←", "command"),
      mapPointingButton("button2").to("→", "command"),
      mapPointingButton("button3").to("mission_control"),
    ]),
  rule(
    "Hold Caps Lock: mouse motion scrolls (requires the Caps Lock rule)",
  ).manipulators([
    mouseMotionToScroll()
      .options({
        momentum_scroll_enabled: false,
      })
      .condition(ifVar(capsLockLayerVarName)),
  ]),
  rule(
    "Left ⌘ + right-hand keys → numpad (use right ⌘ for shortcuts)",
  ).manipulators([
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
  rule(
    "Left ⌥ + h j k l moves the mouse, u i o / f d s click, n m , . scrolls ← ↓ ↑ →",
  ).manipulators([
    map("h", "l⌥").toMouseKey({ x: -mouseMoveSpeed }),
    map("j", "l⌥").toMouseKey({ y: mouseMoveSpeed }),
    map("k", "l⌥").toMouseKey({ y: -mouseMoveSpeed }),
    map("l", "l⌥").toMouseKey({ x: mouseMoveSpeed }),
    map("␣", "l⌥").toMouseKey({ speed_multiplier: mouseSpeedMultiplier }),
    // Scroll ← ↓ ↑ →
    map("n", "l⌥").toMouseKey({ horizontal_wheel: mouseScrollSpeed }),
    map("m", "l⌥").toMouseKey({ vertical_wheel: mouseScrollSpeed }),
    map(",", "l⌥").toMouseKey({ vertical_wheel: -mouseScrollSpeed }),
    map(".", "l⌥").toMouseKey({ horizontal_wheel: -mouseScrollSpeed }),
    map("u", "l⌥").toPointingButton("button1"),
    map("i", "l⌥").toPointingButton("button2"),
    map("o", "l⌥").toPointingButton("button3"),
    map("f", "l⌥").toPointingButton("button1"),
    map("d", "l⌥").toPointingButton("button2"),
    map("s", "l⌥").toPointingButton("button3"),
  ]),
  rule(
    "[ → Delete, ' → Return, tap right ⌘ → ⌃Space (input source)",
  ).manipulators([
    map("[", null, "any").to("⌫"),
    map("'", null, "any").to("⏎"),
    map("r⌘").toIfAlone("␣", "r⌃").to("r⌘"),
  ]),
  // Toggle the Dvorak layer with left Option+Esc and briefly show the active layer
  // name. The delayed action removes the notification after ~1s (or on the next
  // key press, whichever comes first) so the badge only flashes.
  // Only the physical Esc key toggles: the Esc sent by tapping Caps Lock is an
  // output event and is not matched again.
  // The toggle and the layer are one rule so they are always enabled together.
  // Keep it below the Delete/Return and numpad rules, which take precedence.
  rule("Left ⌥ + Esc toggles a Dvorak layer (/ on the q key)").manipulators([
    map("escape", "l⌥")
      .condition(ifVar(dvorakLayerVarName, 0))
      .toVar(dvorakLayerVarName, 1)
      .toNotificationMessage(dvorakNotificationId, "⌨ Dvorak")
      .toDelayedAction(
        toRemoveNotificationMessage(dvorakNotificationId),
        toRemoveNotificationMessage(dvorakNotificationId),
      )
      .parameters({ "basic.to_delayed_action_delay_milliseconds": 1000 }),
    map("escape", "l⌥")
      .condition(ifVar(dvorakLayerVarName, 1))
      .toVar(dvorakLayerVarName, 0)
      .toNotificationMessage(dvorakNotificationId, "⌨ QWERTY")
      .toDelayedAction(
        toRemoveNotificationMessage(dvorakNotificationId),
        toRemoveNotificationMessage(dvorakNotificationId),
      )
      .parameters({ "basic.to_delayed_action_delay_milliseconds": 1000 }),
    // Remap QWERTY physical keys to Dvorak output while the layer is active.
    // Shift/⌃/right ⌘ pass through, so capitals and shortcuts follow Dvorak
    // (left ⌘ stays the numpad layer). [ and ' are omitted: they are ⌫/⏎.
    // Option is excluded so ⌥ characters stay on their QWERTY positions.
    withCondition(ifVar(dvorakLayerVarName, 1))([
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
  ]),
]);
