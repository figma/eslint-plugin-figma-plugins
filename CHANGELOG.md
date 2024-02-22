# Changelog

## Unreleased

Any changes that haven't been included in a published version will be listed here.

## 0.14.0

- Added `node.reactions = ...` to the list of banned property setters under `ban-deprecated-sync-prop-setters`. Use `node.setReactionsAsync` instead.

## 0.13.0

- Updated `ban-deprecated-sync-prop-getters` rule to allow _assignment_ to properties. This allows for statements such as `instance.mainComponent = ...`.

## 0.12.0

- Initial published version