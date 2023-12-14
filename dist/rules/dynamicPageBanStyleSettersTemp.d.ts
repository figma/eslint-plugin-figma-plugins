import type { TSESLint as _ } from '@typescript-eslint/utils';
/**
 * This rule bans and autofixes calls to "setStyle()" methods that take style
 * objects as parameters. These methods were introduced during the dynamic-page
 * Plugin API beta, but we decided to return to ID-assigning async setters to
 * stay consistent with pre-existing ID properties.
 *
 * Importantly, this rule should only apply to code written early in the beta
 * period; the number of developers affected should be small. We should remove
 * this rule after we've confirmed that everyone has transitioned away from
 * those methods.
 */
export declare const dynamicPageBanStyleSettersTemp: _.RuleModule<"useReplacement", never[], _.RuleListener>;
