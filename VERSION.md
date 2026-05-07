# IntListPC Version Notes

Current base version: `1.0a`

Change numbering rule: while this base version is active, label follow-up changes as `1.0a-1`, `1.0a-2`, `1.0a-3`, and so on until the user asks for a new version.

Last change tag: `1.0a-6`

`1.0a-1` - Supabase save now verifies that `account_backups` returns the saved row after `S`.
`1.0a-2` - Login by nickname now loads profile avatar from `account_backups`, and cloud download shows the exact Supabase error.
`1.0a-3` - Cloud profile/save/load requests now stop waiting after 12 seconds and show a tablet/network-specific message instead of hanging forever.

`1.0a-4` - Cloud save/load prepared for direct REST requests.
`1.0a-5` - Cloud endpoint switched to Cloudflare Worker proxy.
`1.0a-6` - Supabase removed; cloud save/load now uses Yandex Cloud API Gateway and Cloud Functions.
