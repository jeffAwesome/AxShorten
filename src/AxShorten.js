
AxShorten = (function() {
  'use strict';

  //-------------------------------
  // Public API
  //-------------------------------

  var AC = function (options) {
    this.characterLimit = options.characterLimit || 100;
    this.useHeight = options.useHeight || false;
    this.originalContent = '';
    this.contentLength = 0;
    this.newContent = '';
    this.charactersToBeShown = '';
    init.call(this, options.elem);
  };

  //-------------------------------
  //  Private API *?
  //-------------------------------

  var isInTag = false;
  var currentSizeOfCharactersToBeShown = 0;
  var openTags = []; // Stack for opened tags, so I can close them later
  var tagName = null;


  var init = function(elem) {
    this.elem = assignElement(elem);
    this.originalContent = this.elem.innerHTML;
    this.contentLength = this.elem.innerHTML.length;
    setupShorten.call(this)
  };

  var assignElement = function(elem) {
    if (elem.length) {
      return elem[0];
    } else {
      return elem;
    }
  };

  var setupShorten = function() {
    if (this.useHeight) {
      checkHeight.call(this, this.contentHeight);
    } else {
      checkLength.call(this, this.contentLength);
    }
  };

  var checkHeight = function(contentHeight) {
    if (this.contentHeight < this.heightLimit) {
      createNewContent.call(this);
    }
  };

  var checkLength = function(contentLength) {
    if (this.contentLength > this.characterLimit) {
      createNewContent.call(this);
    }
  };

  var createNewContent = function() {
    this.newContent = this.originalContent.substr(0, this.characterLimit);
    parseContent.call(this);
  };

  var parseContent = function() {
    if (this.newContent.indexOf('<') >= 0) {
      parseContentForHtml.call(this);
    } else {
      parseContentForNonHtml.call(this);
    }
  };

  var parseContentForNonHtml = function() {
    this.charactersToBeShown = this.originalContent.substr(0, this.characterLimit);
    returnShortContent.call(this);
  };

  var parseContentForHtml = function() {
    parseAllHtmlContent.call(this);
    returnShortContent.call(this);
  };

  var parseAllHtmlContent = function() {
    var i = null,
        r = null;

    for (i = 0, r = 0; r <= this.characterLimit; i++) {
      formatShortContent.call(this, i);

      checkForEndingHtmlTag.call(this, i);

      if (isInTag) {
        this.charactersToBeShown += this.originalContent.charAt(i);
      } // Add tag name chars to the result
      else {
        r++;
        if (currentSizeOfCharactersToBeShown <= this.characterLimit) {
          this.charactersToBeShown += this.originalContent.charAt(i);
          currentSizeOfCharactersToBeShown++;
	} else {
          // Now I have the characters needed
	  checkOpenTags.call(this);
	  break;
        }
      }
    } // end for loop
  };

  var checkForEndingHtmlTag = function(indexOfCharacter) {
    if (isInTag && this.originalContent.charAt(indexOfCharacter) === '>') {
      isInTag = false;
    }
  };

  var checkOpenTags = function() {
    if (openTags.length > 0) {
      closeOpenTags.call(this);
    }
  };

  var closeOpenTags = function() {
    for (var j = 0; j < openTags.length; j++) {
      //console.log('Cierro tag ' + openTags[j]);
      this.newContent+= '</' + openTags[j] + '>'; // Close all tags that were opened

     // You could shift the tag from the stack to check if you end with an empty stack, that means you have closed all open tags
    }
  };

  var formatShortContent = function(indexOfCharacter) {
    if (this.newContent[indexOfCharacter] === '<' && !isInTag) {
      isInTag = true;

      // This could be "tag" or "/tag"
      tagName = this.originalContent.substring(indexOfCharacter + 1, this.originalContent.indexOf('>', indexOfCharacter));

    // If its a closing tag
      if (tagName[0] === '/') {

	if (tagName != '/' + openTags[0]) {
	  this.errMsg = 'ERROR en HTML: the top of the stack should be the tag that closes';
	} else {
	  openTags.shift(); // Pops the last tag from the open tag stack (the tag is closed in the retult HTML!)
	}
      } else {
	// There are some nasty tags that don't have a close tag like <br/>
	if (tagName.toLowerCase() != 'br') {
	  openTags.unshift(tagName); // Add to start the name of the tag that opens
	}
      }
    }
  };


  var returnShortContent = function() {
    var html = '<div class="shortcontent">' + this.charactersToBeShown +
                    '...</div>';
     this.elem.outerHTML = html;
  }

  return AC;

}());


