# fontSwitcher
Dynamically add [Google Fonts](https://www.google.com/fonts) and [Adobe Edge Web Fonts](https://edgewebfonts.adobe.com/index) and apply them on the fly.  Create or add font stacks with a single line of JavaScript.

### Usage:
To use fontSwitcher, include this line between your `<head>` and `</head>` tags, or at the end of your `<body>` tag:

`<script src="https://raw.githubusercontent.com/freginold/fontSwitcher/master/fontSwitcher.min.js"></script>`

Or to use a specific version, to avoid possible breakage when a new version is released, link to a specific version number, such as:

`<script src="https://raw.githubusercontent.com/freginold/fontSwitcher/master/fontSwitcher_v2_0.min.js"></script>`

In its simplest format, call fontSwitcher like this:

`fontSwitcher('fontName#flag', 'class');`

where `fontName` is the new font to load and `class` is the class to attach the new font to.  `flag` is used to specify whether the font is a Google font (`#g`) or an Adobe font (`#a`).  If it's neither -- such as a native font or a generic font -- then no flag is necessary.

So to load the Google font "Lobster" and apply it to the "smallTitle" class, the code would look like this:

`fontSwitcher('Lobster#g', 'smallTitle');`

However, you can also create and apply a whole font stack with one command, rather than just load an individual font.  Use an array to specify fallback fonts or a font stack.  Both Google and Adobe fonts can be loaded with the same function call.  For example:

`fontSwitcher(['Aclonica#a', 'Permanent Marker#g', 'Lucida Console', 'monospace'], 'thisClass');`

Capitalization and spacing matter for Google font names.  Spacing matters for Adobe fonts (as well as system and generic fonts) but capitalization does not.

You can use Google's [Web Font Loader] (https://github.com/typekit/webfontloader#get-started) instead, but fontSwitcher automatically applies the new font to any class you specify, so you can use it for multiple fonts at the same time.

For any font that does not include a `#g` or `#a` flag, no request is made to Google or Adobe, so fontSwitcher can be used to apply native or pre-loaded fonts without any additional HTTP requests being generated.

More improvements will be coming, including support for font various styles and effects.  Adobe fonts by default include a range of weights and styles.

Current version is v2.0.

###Release log:

* Version 2.0:
  - added support for Adobe Edge Web Fonts
  - added flags to specify font source
  - can now create `<link>` element for multiple Google/Adobe fonts at once
* version 1.4:
  - added support for generic fonts
* version 1.3:
  - added support for fallback fonts
* version 1.2:
  - supports multiple Google fonts at once
* version 1.1:
   - auto-creates `<link>` element if not already present
