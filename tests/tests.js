var expect = chai.expect;
describe('AxShorten', function() {
  it('should have an element and a character count limit', function() {
     var options = {
           elem: document.querySelector('.testElement'),
           characterLimit: 5
     };
     var newElem = new AxShorten(options);
     newElem.should.have.property('elem');
     newElem.should.have.property('characterLimit');
  });

  it('should have a default character limit', function() {
     var options = {
           elem: document.querySelector('.testElement1')
     };

     var newElem = new AxShorten(options);
     expect(newElem.characterLimit).to.equal(100);
  });

  it('should have a reference to original content in memory', function() {
     var options = {
           elem: document.querySelector('.testElement2')
     };

     var newElem = new AxShorten(options);
     expect(newElem.originalContent).to.equal(options.elem.innerHTML);
  });


  it('should have reference to original content length in memory', function() {
     var options = {
           elem: document.querySelector('.testElement3')
     };

     var newElem = new AxShorten(options);
     expect(newElem.contentLength).to.equal(options.elem.innerHTML.length);
  });


  it('should have public reference to the new content', function() {
     var options = {
           elem: document.querySelector('.testElement4')
     };

     var newElem = new AxShorten(options);
     expect(newElem.newContent).to.exist;
  });

  it('new content should have a length', function() {
     var options = {
           elem: document.querySelector('.testElement5')
     };

     var newElem = new AxShorten(options);
     expect(newElem.newContent.length).to.equal(newElem.characterLimit);
  });

  it('should shorten the content of the targeted dom element', function() {
     var options = {
           elem: document.querySelector('.testElement6Container')
     };

     var newElem = new AxShorten(options);

     var elem = document.querySelector('.testElement6')

     expect(elem.innerHTML.length).to.be.below(newElem.characterLimit);
  });

});
