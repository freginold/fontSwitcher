
  /*  fontSwitcher v2.0, June 2016:
          - added support for Adobe Edge Web Fonts
          - added flags to specify whether Google, Adobe, or other
          - changed <link> element name from class to font name
          - changed font input to an array or single variable
          - can now create <link> element for multiple Google fonts at one time
      fontSwitcher v1.4, June 2016
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
          - add automatic capitalization (first letter of each word) for Google fonts?
          - check if requested font is a Google Font; if a native/loaded font don't call
          - check if font loaded, if it didn't, notify? - at least revert back to current font
          - include check to make sure requested font isn't same as current font
          - make npm package
          - add support for 'sans serif' -- change to 'sans-serif'
          
        CodePen .js - http://codepen.io/freginold/pen/vLJewY.js
        GitHub .js - https://raw.githubusercontent.com/freginold/fontSwitcher/master/fontSwitcher.js
        Blogger - http://tech-in-check.blogspot.com/p/fontswitcher-google-font.html
  */
  //v1.0 = 1 KB, v1.1 = 2 KB, v1.2 = 2 KB, v1.3 = 4KB, v1.3.min = 1 KB, v1.4 = 5 KB, v2.0 = 7 KB, v2.0.min = 3 KB, current WIP = 7 KB
  //set some made-up/new element as serif, apply newFontName, check to see if it's serif or newFontName, if new one, font is already
  //there/loaded -- won't work b/c even if not valid font, still applies it as the attribute
  //include check in case requested font is same as test font (serif, cursive, etc.)
  //can check to see if current font is same as selected font (if set by CSS won't show, but will show if set by JS)

function fontSwitcher(fontInput, classInput) {  

  function checkLink(thisFont) {
    //checks to see if <link> element for this font has already been built; if not, builds it
    var linkName="fSg_"+thisFont;
    if (!(document.getElementById(linkName))) {
        //if fontSwitcher link for this font doesn't exist, create it
        var linkElement=document.createElement("link");
        linkElement.id=linkName;
        linkElement.rel="stylesheet";
        linkElement.type="text/css";
        document.head.appendChild(linkElement);
        document.getElementById(linkName).href=makeGoogleURL(thisFont);
    }
    else if (!((document.getElementById(linkName).rel=="stylesheet") &&
          (document.getElementById(linkName).type=="text/css"))) {
            document.getElementById(linkName).rel="stylesheet";
            document.getElementById(linkName).type="text/css";
        }
  }

  function checkScript(thisFont) {
    //checks to see if <script> element for this font has already been built; if not, builds it
    var scriptName="fSa_"+thisFont;
    if (!(document.getElementById(scriptName))) {
        //if fontSwitcher script element for this font doesn't exist, create it
        var scriptElement=document.createElement("script");
        scriptElement.id=scriptName;
        scriptElement.type="text/javascript";
        document.head.appendChild(scriptElement);
        document.getElementById(scriptName).src=makeAdobeURL(thisFont);
    }
  }
  
  function makeGoogleURL(fontName) {
    //create URL to grab Google font
    var newFontURL="https://fonts.googleapis.com/css?family="+addReplChar(fontName, '+');
    return newFontURL;
  }
  
  function makeAdobeURL(fontName) {
    //create URL to grab Adobe font
    //add "http:" for local development
    var newFontURL="//use.edgefonts.net/"+addReplChar(fontName, '-')+".js";
    return newFontURL;
  }
  
  function addReplChar(fName, replChar) {
    //replace space w/ + or - for URL
    var urlString='';
    for (var i=0;i<(fName.length);i++) {
      if (fName.charAt(i)==" ") {
        urlString=urlString+replChar;
      }
      else {
        urlString=urlString+fName.charAt(i);
      }
    }
    return urlString;
  }
  
  function checkIfArray(paramToCheck) {
      // check to see if parameter is an array (true) or a string (false)
      var testString=''+paramToCheck.constructor+'';
      if (!!(arrayPatt.test(testString))) {
        return true;
      }
      else {return false;}
  }
    
  function getStringFromArray(arrayParam) {
    //turn arrayParam into a string for font stack
    var tempString='';
    for (var i=0; i<arrayParam.length;i++) {
        if (i>0) {
            tempString=tempString+',';
        }
        tempString=tempString+arrayParam[i];
    }
    return tempString;
  }

  function loopThroughFontArray() {
    //loop through array, check if any <link> elements need to be created
    var flagVar;
    for (var i=0; i<fontArray.length;i++) {
        if (!!(/#/.test(fontArray[i]))) {
            flagVar=fontArray[i].slice(-2).toLowerCase();
            fontArray[i]=fontArray[i].slice(0,-2);
                switch (flagVar) {
                    case ('#g'):
                        //Google Fonts
                        checkLink(fontArray[i]);
                        break;
                    case ('#a'):
                        //Adobe Edge Web Fonts
                        fontArray[i]=fontArray[i].toLowerCase();
                        checkScript(fontArray[i]);
                        break;
                }
        }
    }
  }
  
  // ------- execution starts here ------------
  
  var fontStack='';
  var fontArray=[];
  var arrayPatt=/\bArray/;
  
  if (!!(checkIfArray(fontInput))) {
    // if input is an array
    fontArray=fontInput;
  }
  else {
    // if input is a string (just one font)
    fontArray[0]=fontInput;
  }
  loopThroughFontArray();
  fontStack=getStringFromArray(fontArray);
  var elements=document.getElementsByClassName(classInput);
  for (var a=0;a<elements.length;a++){
    elements[a].style.fontFamily=fontStack;
  }
}