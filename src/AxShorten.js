var AxShorten = function AxShorten(options) {
  this.elem = options.elem;
  this.characterLimit = options.count || 100;

  /* We need to grab the length of the element content */
  var content = this.elem.textContent;
  var contentLength = this.elem.textContent.length;
}
