# IntListPC Version Notes

Current version: `1.02d`

`1.01d` - Restored the old Inter typography from the earlier sheet and replaced the add-card text plus with a CSS-drawn plus so it stays centered on desktop and mobile.

Previous line: `1.01c` - Cloud button arrows now animate only during manual button actions; account cloud spinner appears to the right of the status text and disappears immediately when the request finishes, while the message fades out after 5 seconds.

Previous line: `1.01b` - Account cloud status now appears under the account name with spinner and fades out; cloud buttons have animated arrows; character cards use a three-dot context menu with download, clone, and staged delete; global delete button removed; JSON upload button confirms staged deletes; account form hints removed; add-card plus adjusted.

`1.01e` - CSS file now has cache busting, level numerals are forced to Inter, and add-card plus is stabilized on desktop and mobile.

`1.01f` - Account cloud status moved to the center of the character toolbar to stop nickname jumping; account nickname enlarged; cache-busting updated.

`1.01h` - Cloud toolbar status is now absolutely positioned between the character counter and JSON upload button, so the upload/delete button no longer shifts when messages appear or fade.


`1.01i` - Character saving is locked to the exact active character id when switching or returning to the menu; sheet records are stamped with their owner id and account/menu fields are excluded from character snapshots to prevent one character's sheet from being copied onto another card.

`1.01j` - Clone and new character names no longer get extra copy/number labels; switching characters resets HP max tracking so HP is not changed by opening another card; JSON toolbar now opens a menu with load/save-all, bundle import can add multiple characters up to the limit, and cloud save/load blocks page clicks while active.

`1.01k` - Cloud save/load controls were combined into one stable cloud button with a dropdown menu; arrows animate only for the selected cloud direction and disappear afterward.

`1.02` - After cloud save, the current account is forced back into local storage; cloud load now syncs the visible sheet to the newly loaded active character before returning to the menu, preventing old DOM state from overwriting a loaded character after refresh.

`1.02a` - Main menu gained Characters/Workshop pages for future GM tools; workshop remains local-only.

`1.02b` - Added a local GM checkbox in the account/profile menu. When GM mode is off, the main menu shows the old single “Персонажи” title; when it is on, the title is hidden and the Персонажи/Мастерская tabs are shown.


`1.02c` - Reworked GM navigation: the main menu title is visible again and becomes the page switcher when GM mode is enabled; the tab buttons are hidden, mobile swipes switch between Characters and Workshop, and page changes now animate.


`1.02d` - Workshop now has Bestiary and Initiative tabs. Bestiary supports local NPC cards with avatar, name, HP, AC, perception/saves, ability modifiers, selectable skills with proficiency-based rolls, attacks, and notes.
