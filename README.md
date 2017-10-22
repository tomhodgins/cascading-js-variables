# Cascading JS Variables

Cascading JS Variables let CSS authors include cascading variables in the stylesheets they write.

What does it mean for a variable to 'cascade'? In this case it means variable assignments are inherited globally, but can be reassigned for individual elements and children of those elements differently. Another feature of cascading variables is their ability to change in value (responsively via CSS, or via JS) in different situations making them a very flexible tool for the expression of dynamic values with a straightforward notation inside CSS.

### Variable Syntax

```css
--variable: value;
```

```css
var(--variable);
```

The syntax supported by this plugin for assigning and using a variable is the same as [the syntax for native CSS variables](https://drafts.csswg.org/css-variables-1). Each variable name is represented by a property name beginning with two hyphens: `--`. To reference the value of a variable inside CSS values, use the function `var()` with the name of the variable between the brackets.

```html
data-variable="value"
```

This plugin also allows HTML authors to assign cascading variables by defining a custom data attribute beginning with `data-` and followed by the variable name, with the desired variable value set as the value of the attribute in HMTL.

JavaScript authors are also able to use this custom attribute interface to more easily assign and reassign different values to elements in the DOM.

### Usage

```javascript
cascadingVariables(selector, rule)
```

- `selector` is a CSS selector
- `rule` is a semicolon-separated list of CSS property declarations

This plugin is a JavaScript function that accepts a CSS selector and properties, including variable assignment and references. The plugin will find any elements in the DOM matching the given CSS selector, mark them with a unique attribute, and return CSS text with styles written targeting elements by these unique attributes.

To set the variable `--example` to `green` we can accomplish that a few ways:

```javascript
cascadingVariables(':root', '--example: green;')
```

This would have the effect of setting the following attribute on the HTML tag:

```html
data-example="green"
```

Which could also be achieved in HTML by writing:

```html
<html data-example="green">
```

Or added programmtically via JS at any point with something like:

```javascript
document.documentElement.setAttribute('data-example', 'green')
```

In any of these cases, whether assigned from CSS, HTML, or JavaScript, the plugin would be able to read a rule like this and use the value `green` for the variable:

```javascript
cascadingVariables(':root', 'background: var(--example);')
```

### Info

- Website: https://tomhodgins.github.io/cascading-js-variables
- Demo: https://tomhodgins.github.io/cascading-js-variables/tests/demo.html
- Author: Tommy Hodgins
- License: MIT