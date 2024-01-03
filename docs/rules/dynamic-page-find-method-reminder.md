# Reminder to call loadPagesAsync() before calling find*() methods (`@figma/figma-plugins/dynamic-page-find-method-reminder`)

⚠️ This rule _warns_ in the ⚡ `dynamic-page` config.

<!-- end auto-generated rule header -->

The Figma API contains several methods, such as `DocumentNode.findAll()`, that
require special handling when used with the `dynamic-page` manifest field.
Before using any of these methods, your plugin code should include an `await`-ed
call to `figma.loadPagesAsync()`. This call only needs to happen once per plugin
run, so we recommend performing it somewhere in your plugin's setup code.
