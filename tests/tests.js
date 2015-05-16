var expect = chai.expect;
describe('AxShorten', function() {
  it('should have an element and a character count limit', function() {
     var options = {
           elem: document.querySelector('.testElement'),
           count: 5
     };
     var newElem = new AxShorten(options);
     newElem.should.have.property('elem');
     newElem.should.have.property('characterLimit');
  });

  it('should have a default character limit', function() {
     var options = {
           elem: document.querySelector('.testElement')
     };

     var newElem = new AxShorten(options);
     expect(newElem.characterLimit).to.equal(100);
  });

  it('should have access to original content in memory', function() {
     var options = {
           elem: document.querySelector('.testElement')
     };

     var newElem = new AxShorten(options);
     expect(newElem.originalContent).to.equal(options.elem.textContent);
  });


  it('should have access to original content length in memory', function() {
     var options = {
           elem: document.querySelector('.testElement')
     };

     var newElem = new AxShorten(options);
     expect(newElem.contentLength).to.equal(options.elem.textContent.length);
  });


});
