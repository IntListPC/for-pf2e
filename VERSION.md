# IntListPC Version Notes

Current base version: `1.0a`

Change numbering rule: while this base version is active, label follow-up changes as `1.0a-1`, `1.0a-2`, `1.0a-3`, and so on until the user asks for a new version.

Last change tag: `1.0a-3`

`1.0a-1` - Supabase save now verifies that `account_backups` returns the saved row after `S`.
`1.0a-2` - Login by nickname now loads profile avatar from `account_backups`, and cloud download shows the exact Supabase error.
`1.0a-3` - Cloud profile/save/load requests now stop waiting after 12 seconds and show a tablet/network-specific message instead of hanging forever.
