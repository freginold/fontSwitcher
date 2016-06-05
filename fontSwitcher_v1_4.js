
/*  fontSwitcher v1.4 improvements:
          - added support for generic fonts
    fontSwitcher v1.3 improvements:
          - added support for fallback font(s)
    fontSwitcher v1.2, Jan 2016 improvements:
          - supports multiple Google fonts at once
    fontSwitcher v1.1, Jan 2016 improvements:
          - auto-creates <link> element if not already present
*/

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