var should = chai.should();
var expect = chai.expect;
describe('AxShorten', function() {
  it('should have an element and a character count limit', function() {
     var options = {
           elem: '<p>This is a long paragraph with a decent chunk of text',
           count: 5
     };
     var newElem = new AxShorten(options);
     newElem.should.have.property('elem');
     newElem.should.have.property('count');
  });

  it('should have a default character limit', function() {
     var options = {
           elem: '<p>This is a long paragraph with a decent chunk of text'
     };

     var newElem = new AxShorten(options);
     expect(newElem.count).to.equal(100);
  });
});
