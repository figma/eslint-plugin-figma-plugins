# Advice on using the `documentchange` event (`@figma/figma-plugins/dynamic-page-documentchange-event-advice`)

⚠️ This rule _warns_ in the 👍 `recommended` config.

<!-- end auto-generated rule header -->

The `documentchange` event is not compatible with the `dynamic-page` manifest option. Please use `PageNode.on('nodechange')` or `figma.on('stylechange')` instead.
