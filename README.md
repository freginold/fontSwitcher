# fontSwitcher
Dynamically add Google web fonts and apply them on the fly.  Create or add font stacks with a single line of JavaScript.

### Usage:
To use fontSwitcher, include this line between your `<head>` and `</head>` tags, or at the end of your `<body>` tag:

`<script src="https://raw.githubusercontent.com/freginold/fontSwitcher/master/fontSwitcher.min.js"></script>`

Or to use a specific version, to avoid possible breakage when a new version is released, link to a specific version number, such as:

`<script src="https://raw.githubusercontent.com/freginold/fontSwitcher/master/fontSwitcher_v2_0.min.js"></script>`

In its simplest format, call fontSwitcher like this:

`fontSwitcher('fontName', 'class');`

where `fontName` is the new font to load and `class` is the class to attach the new font to.


...

`fallbackFont1` (and additional fallback fonts, if any) is the font to fall back to if the primary font does not load for any reason. The fallback font can be a native or pre-loaded font, a generic font, or it can even be a Google web font (if the web font has already been loaded). If using a Google web font as a fallback font and you loaded it with fontSwitcher, make sure it has been applied to an alternative class, so that the `<link>` element is not overwritten.

Capitalization and spacing matter for Google font names.

You can use fontSwitcher to apply multiple Google fonts on the same page; just call the function once for each class.

To attach multiple classes to an element, use the format:

`class="class1 class2"`

You can use Google's [Web Font Loader] (https://github.com/typekit/webfontloader#get-started) instead, but fontSwitcher automatically applies the new font to any class you specify, so you can use it for multiple fonts at the same time.

fontSwitcher can also be used to apply local fonts (ie. Courier, Arial) but it may be slower than simply changing the fontFamily attribute since it will still call to Google first.  For generic fonts, no Google request is made.

More improvements will be coming, including support for font styles and effects.

Current version is v1.4.

###Release log:

* version 1.4:
  - added support for generic fonts
* version 1.3:
  - added support for fallback fonts
* version 1.2:
  - supports multiple Google fonts at once
* version 1.1:
   - auto-creates `<link>` element if not already present
