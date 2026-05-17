# IntListPC Version Notes

Current version: `1.4.1`

`1.5.2` - Profile title now uses the nickname, PIN layout is stable, friends collapse control moved into the friends block, cloud auto-sync moved below upload/download, and temporary HP returned to the calculator.

`1.5` - Profile controls moved into compact settings/friends buttons; friends gained notification dots, separate search/request/inbox windows, collapsible friend avatars, cleanup menus, and send-all character delivery.

`1.4.2` - Profile modal rebuilt as a profile page with a Friends tab; cloud profile snapshots now carry friends, friend requests, and incoming character sends.

`1.4.1` - Version label updated; on page refresh or a new visit, logged-in accounts now compare the cloud snapshot with the current local profile and offer to load cloud data only when they differ.

`1.04` - Version label and cache-busting updated for the temporary HP release; attack critical damage now reads the live crit state and falls back to a doubled normal damage formula when no explicit crit formula is set; attacks and equipment weapons can optionally add Strength or a custom flat bonus to damage; the bestiary sheet hides the XP bar and the extra damage controls are kept on one row; account login now auto-loads cloud data, logout asks whether to save, and cloud autosave is debounced, change-aware, non-blocking, and shown only by the cloud upload animation.

`1.03k` - Character and bestiary HP calculators now support saved temporary HP, replace the previous temporary HP value when applied, consume it before current HP on damage, and render it as a gray-cyan bar with matching animations.

`1.03j` - After combat starts, initiative setup controls and avatar initiative pickers are hidden; bestiary and character skill displays now refresh their saved proficiency dots and lore/intelligence entries immediately.

`1.03i` - Local account labels now show "Лакал. Режим" instead of "Локальный профиль".

`1.03h` - Bestiary sheet headers now reserve the same HP-row height as character sheets, keeping the banner dimensions consistent.

`1.03g` - Battle sheets now keep the current initiative sheet fixed next to the initiative list while an independently resizable secondary sheet opens to its right.

`1.03f` - Clicking a battle participant during combat now opens a second persistent sheet beside the current initiative sheet instead of replacing it.

`1.03e` - Battle sheet default window is now slightly narrower and shorter to match the requested screenshot proportions.

`1.03d` - Battle sheet default height is slightly smaller and the "Изменения окна" checkbox now sits next to the end-turn button.

`1.03c` - Battle sheet window now defaults to the requested compact height and only exposes move/resize/reset controls when the "Изменения окна" checkbox is enabled.

`1.03b` - Bestiary skill display no longer drops saved skill selections during redraws; level -1 and 0 now use level 1 for proficiency-style bonuses; the battle sheet panel can be moved and resized with saved layout.

`1.03a` - Battle add panel now supports selecting several available heroes/creatures and adding them to combat in one confirmation.

`1.03` - Added a battle clear button that removes all participants, and deleting a bestiary sheet now also removes that creature from battle participants.

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
