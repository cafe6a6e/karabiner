# Publish to KE-complex_modifications

The rules can be published on [ke-complex-modifications.pqrs.org](https://ke-complex-modifications.pqrs.org/) as `personal_cafe6a6e_zen40.json` in the "Personal Settings" category.
See the [upstream README](https://github.com/pqrs-org/KE-complex_modifications#how-to-add-your-rules) for the full procedure.

1. Fork [pqrs-org/KE-complex_modifications](https://github.com/pqrs-org/KE-complex_modifications) and clone it next to this repository.

   ```
   $ git clone --depth 1 https://github.com/cafe6a6e/KE-complex_modifications.git ../KE-complex_modifications
   $ git -C ../KE-complex_modifications submodule update --init --recursive --depth 1
   $ git -C ../KE-complex_modifications switch -c personal-cafe6a6e
   ```

2. Export the ruleset and its extra description into the clone.
   Without an argument, the files are written under `dist/`.

   ```
   $ bun ke:export ../KE-complex_modifications
   ```

3. Add the entry printed by the script to the `personal-settings` files in `public/groups.json`.
4. Validate the files in the clone.

   ```
   $ make -C ../KE-complex_modifications all
   ```

5. Copy the ruleset to `~/.config/karabiner/assets/complex_modifications` and import it from Karabiner-Elements Settings > Complex Modifications > Add rule.

   ```
   $ bun ke:install
   ```

6. Commit, push and create a pull request to pqrs-org/KE-complex_modifications.

Notes:

- KE-complex_modifications is in the public domain, so the published rules are too.
- Karabiner-Elements uses the first matching rule. Keep the rules in the order they are exported; the Dvorak rule must stay below the `[`/`'` and left ⌘ numpad rules.
- The extra description shown on the site is `ke/extra_description.html`.
