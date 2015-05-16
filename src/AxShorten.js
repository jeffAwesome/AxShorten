
AxShorten = (function() {
  'use strict';

  //-------------------------------
  // Public API
  //-------------------------------

  var AC = function (options) {
  	this.elem = options.elem;
    this.characterLimit = options.count || 100;
    this.originalContent = '';
    this.contentLength = 0;
   	init.call(this);
  };

  //-------------------------------
  //  Private API *?
  //-------------------------------

  var isInTag = false; 
  var charactersToBeShown = ''; 
  var currentSizeOfCharactersToBeShown = 0; 
  var openTags = []; // Stack for opened tags, so I can close them later
  var tagName = null;


  var init = function() {
    this.originalContent = this.elem.innerHTML;
    this.contentLength = this.elem.innerHTML.length;
    /*checkLength.call(this, contentLength); */
  };

  var checkLength = function(contentLength) {
    if (contentLength > this.characterLimit) {
       this.newContent = this.originalContent.substr(0, this.characterLimit);
       parseContent.call(this);
    };
  };

  var parseContent = function() {
  	if (this.newContent.indexOf('<') >= 0) {
  		parseContentForHtml.call(this);
  	}
  }

  var parseContentForHtml = function() {


	for (var i = 0, r = 0; r <= this.characterLimit; i++) {
	                        if (this.newContent[i] == '<' && !isInTag) {
	                            isInTag = true;

	                            // This could be "tag" or "/tag"
	                            tagName = this.newContent.substring(i + 1, this.newContent.indexOf('>', i));

	                            // If its a closing tag
	                            if (tagName[0] == '/') {


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
	                        if (isInTag && this.newContent[i] == '>') {
	                            isInTag = false;
	                        }

	                        if (isInTag) { this.charactersToBeShown += this.newContent.charAt(i); } // Add tag name chars to the result
	                        else {
	                            r++;
	                            if (currentSizeOfCharactersToBeShown <= this.charactersToBeShown) {
	                                this.charactersToBeShown += this.newContent.charAt(i); // Fix to ie 7 not allowing you to reference string characters using the []
	                                currentSizeOfCharactersToBeShown++;
	                            } else // Now I have the characters needed
	                            {
	                                if (openTags.length > 0) // I have unclosed tags
	                                {
	                                    //console.log('They were open tags');
	                                    //console.log(openTags);
	                                    for (j = 0; j < openTags.length; j++) {
	                                        //console.log('Cierro tag ' + openTags[j]);
	                                        charactersToBeShown += '</' + openTags[j] + '>'; // Close all tags that were opened

	                                        // You could shift the tag from the stack to check if you end with an empty stack, that means you have closed all open tags
	                                    }
	                                    break;
	                                }
	                            }
	                        }
	}



	var html = '<div class="shortcontent">' + c +
                    '</div>';


     elem.innerHTML = html;

  }


  //-----------------------------
  // OpenTagStack
  // -----------------------------
  var OpenTagStack = function() {
    var openTags = null;

    function initialize() {
      openTags = [];
    };



    initialize();
  };



  return AC;

}());
