
  /*  fontSwitcher v1.4, June 2016
        improvements:
          - added support for generic fonts (main & fallback)
          - skips Google call for generic fonts
      fontSwitcher v1.3, May 2016
        improvements:
          - added support for fallback font(s)
          - cleaned up code a little bit
      fontSwitcher v1.2, Jan 2016
        improvements:
          - supports multiple Google fonts at once with different class names
          - provide online link to source file instead of having to copy/paste code
      fontSwitcher v1.1, Jan 2016
        improvements:
          - auto-creates <link> element if not already present so user doesn't have to
      fontSwitcher v1.0, Jan 2016
      
        to do:
          - add support for font styles & effects (as optional parameters?)
          - add automatic capitalization (first letter of each word)?
          - check if requested font is a Google Font; if a native/loaded font don't call
          - check if font loaded, if it didn't, notify? - at least revert back to current font
          - include check to make sure requested font isn't same as current font
          - change way it applies font, so applies to whole class at once
          - make npm package
          - bitBucket / gitHub?
          - add support for 'sans serif' -- change to 'sans-serif'
 
        js file - http://codepen.io/freginold/pen/vLJewY.js
        Blogger - http://tech-in-check.blogspot.com/p/fontswitcher-google-font.html
  */
  //v1.0 = 1 KB, v1.1 = 2 KB, v1.2 = 2 KB, v1.3 = 4KB, v1.3.min = 1 KB, v1.4 = 5 KB, current WIP = 5 KB
  //set some made-up/new element as serif, apply newFontName, check to see if it's serif or newFontName, if new one, font is already
  //there/loaded -- won't work b/c even if not valid font, still applies it as the attribute
  //include check in case requested font is same as test font (serif, cursive, etc.)
  //can check to see if current font is same as selected font (if set by CSS won't show, but will show if set by JS)

function fontSwitcher(newFontName, elementClass) {  

  function checkLink() {
    //check to see if link element for this class has already been built
      if (!(document.getElementById(linkName))) {
        //if fontSwitcher link for this class doesn't exist, create it
        var linkElement=document.createElement("link");
        linkElement.id=linkName;
        linkElement.rel="stylesheet";
        linkElement.type="text/css";
        document.head.appendChild(linkElement);
    }
    else if (!((document.getElementById(linkName).rel=="stylesheet") &&
          (document.getElementById(linkName).type=="text/css"))) {
            document.getElementById(linkName).rel="stylesheet";
            document.getElementById(linkName).type="text/css";
        }
  }

  function makeURL(fontName) {
    //create URL to grab the Google font
    newFontURL="https://fonts.googleapis.com/css?family=";
    for (var i=0;i<(fontName.length);i++) {
      if (fontName.charAt(i)==" ") {
        newFontURL=newFontURL+"+";
      }
      else {
        newFontURL=newFontURL+fontName.charAt(i);
      }
    }
    return newFontURL;
  }

  function checkFallbacks() {
    //check if any fallback fonts specified
    if (fontArgs.length<=2) {
        return;
    }
    //loop through fontArgs and add each fallback font to the string
    for (incr=2; incr<fontArgs.length;incr++) {
        if (!!checkGeneric(fontArgs[incr])) {
            //if fallback font is generic
            fallbackString=fallbackString+","+fontArgs[incr];
        }
        else {
            fallbackString=fallbackString+",'"+fontArgs[incr]+"'";
        }
    }
  }
  
  function checkGeneric(thisFont) {
    //check to see if it's a generic font; if it is, return true
    generic=false;
    switch (thisFont.toLowerCase()) {
        case 'serif':
        case 'sans-serif':
        case 'cursive':
        case 'fantasy':
        case 'monospace':
            generic=true;
            break;
        default:
            generic=false;
            break;
    }
    return generic;
  }
  // ------- execution starts here ------------
  
  var newFontURL=makeURL(newFontName);
  var linkName="FS"+elementClass;
  var fontArgs=arguments;
  var fallbackString='';
  var classToChange;
  checkFallbacks();
  if (!checkGeneric(newFontName)) {
    //if non generic font
    checkLink();
    newFontName="'"+newFontName+"'"+fallbackString;
    document.getElementById(linkName).href=newFontURL;
  }
  else {
    newFontName=newFontName+fallbackString;
  }  
  classToChange=document.getElementsByClassName(elementClass);
  for (var i=0;i<classToChange.length;i++){
    classToChange[i].style.fontFamily=newFontName;
  }
}