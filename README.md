# karabiner

My Karabiner-Elements settings

## Requirements

- macOS
- Karabiner-Elements
  - Make sure that the `Default profile` profile exists in the Karabiner-Elements UI.
- bun

## How to install

Install the dependencies first.

```
$ bun install
```

`Default profile` is overwritten by

```
$ bun apply:default
```

If you want to overwrite `'Your profile'`, run

```
$ bun apply 'Your profile'
```

## Layout

| Key                      | Behavior                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Left ⌘ + right-hand keys | Numpad (`m , .` → `1 2 3`, `j k l` → `4 5 6`, `u i o` → `7 8 9`, `␣` → `0`)                                    |
| Right ⌘                  | ⌘ for shortcuts; tap alone for ⌃␣ (input source switch)                                                        |
| `[` / `'`                | ⌫ / ⏎                                                                                                          |
| Caps Lock                | Tap for Esc; hold for the Caps layer (arrows on `h j k l`, `[ ]` on `u i`, `'` on `m`, `-` on `;`, `\` on `/`) |
| Tab (hold)               | Shifted numbers (`! @ # …`) on the numpad positions                                                            |
| ⌥ + keys                 | Mouse keys (move on `h j k l`, click on `u i o` / `f d s`, scroll on `m ,`)                                    |
| ⌥ + Esc                  | Toggle the Dvorak layer (physical Esc key only). `/` is on the `q` key                                         |
