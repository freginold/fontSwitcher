//  fontSwitcher v3.0

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
    // *** add "http:" for local development or use
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
  var elements;
  
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
  if (classInput[0]=='#') {
    // if it's an ID
    document.getElementById(classInput.slice(1)).style.fontFamily=fontStack;
  }
  else if (classInput[0]=='.') {
    // if it's a class
      elements=document.getElementsByClassName(classInput.slice(1));
      for (var a=0;a<elements.length;a++){
        elements[a].style.fontFamily=fontStack;
      }
  }
  else {
    // if it's not an ID or class, process as a tag name
    elements=document.getElementsByTagName(classInput);
    for (var a=0;a<elements.length;a++){
      elements[a].style.fontFamily=fontStack;
    }
  }
}