# Ban `documentchange` event (`@figma/figma-plugins/dynamic-page-ban-documentchange-event`)

💼 This rule is enabled in the ⚡ `dynamic-page` config.

<!-- end auto-generated rule header -->

The `documentchange` event is not compatible with the `dynamic-page` manifest option. Please use `PageNode.on('nodechange')` or `figma.on('stylechange')` instead.
