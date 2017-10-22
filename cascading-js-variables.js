/*

# Cascading JS Variables
## version 0.0.1

Cascading JS Variables let CSS authors include cascading variables in the stylesheets they write.

What does it mean for a variable to 'cascade'? In this case it means variable assignments are inherited globally, but can be reassigned for individual elements and children of those elements differently. Another feature of cascading elements is their ability to change in value (responsively via CSS, or via JS) in different situations making them a very flexible tool for the expression of dynamic values with a straightforward notation inside CSS.

### Variable Syntax

    --variable: value;

    var(--variable);

The syntax supported by this plugin for assigning and using a variable is the same as the syntax for native CSS variables. Each variable name is represented by a property name beginning with two hyphens: `--`. To reference the value of a variable inside CSS values, use the function `var()` with the name of the variable between the brackets.

    data-variable="value"

This plugin also allows HTML authors to assign cascading variables by defining a custom data attribute beginning with `data-` and followed by the variable name, with the desired variable value set as the value of the attribute in HMTL.

JavaScript authors are also able to use this custom attribute interface to more easily assign and reassign different values to elements in the DOM.

### Usage

    cascadingVariables(selector, rule)

- `selector` is a CSS selector
- `rule` is a semicolon-separated list of CSS property declarations

This plugin is a JavaScript function that accepts a CSS selector and properties, including variable assignment and references. The plugin will find any elements in the DOM matching the given CSS selector, mark them with a unique attribute, and return CSS text with styles written targeting elements by these unique attributes.

To set the variable `--example` to `green` we can accomplish that a few ways:

    cascadingVariables(':root', '--example: green;')

This would have the effect of setting the following attribute on the HTML tag:

    data-example="green"

Which could also be achieved in HTML by writing:

    <html data-example="green">

Or added programmtically via JS at any point with something like:

    document.documentElement.setAttribute('data-example', 'green')

In any of these cases, whether assigned from CSS, HTML, or JavaScript, the plugin would be able to read a rule like this and use the value `green` for the variable:

    cascadingVariables(':root', 'background: var(--example);')

### Info

- Website: https://github.com/tomhodgins/cascading-js-variables
- Author: Tommy Hodgins
- License: MIT

*/

function cascadingVariables(selector, rule) {

  var tag = document.querySelectorAll(selector)
  var style = ''
  var count = 0

  for (var i=0; i<tag.length; i++) {

    // Apply variables defined in supplied rule
    rule.replace(/--(.+)\:(.+)[;}]*/gm, function(string, property, value) {

      tag[i].setAttribute('data-' + property, value)

    })

    var attr = selector.replace(/\W+/g, '')
    var newRule = rule.replace(/var\(--([^\)]+)\)/g, function(string, match) {

      // Check if has data attribute on self
      if (tag[i].getAttribute('data-' + match) !== null) {

        return tag[i].getAttribute('data-' + match)

      // Check if parent has data attribute
      } else if (tag[i].closest('[data-' + match + ']') && tag[i].closest('[data-' + match + ']').getAttribute('data-' + match) !== null) {

        return tag[i].closest('[data-' + match + ']').getAttribute('data-' + match)

      // Otherwise return global value
      } else {

        if (match in window) {

          return (new Function('return ' + match))() || ''

        }

      }

    })

    tag[i].setAttribute('data-variable-' + attr, count)

    style += '\n[data-variable-' + attr + '="' + count + '"] {\n'
             + '  ' + newRule + '\n'
             + '}\n'

    count++

  }

  return style

}