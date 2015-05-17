# AxShorten


##DESCRIPTION
AxShorten is a very simple shorten plugin that shortens a block of text.

It currently does this by setting a character limit, but I have plans to add functionality for height based shorten functionality.



##EXAMPLE USAGE

```
  // Get Reference to  Element first
  var exampleElement = document.querySelector('.element-container');
  new AxShorten({elem: exampleElement, characterLimit: 150});

  /* 
  	This will shorten the element to 150 characters.
  	the default character limit is 100.  
  */


  new AxShorten({elem: exampleElement});

```


###HISTORY
AxShorten is based off a jquery plugin that i've used and contributed to,
you can view that plugin at [jquery.shorten github](https://github.com/viralpatel/jquery.shorten "jquery.shorten")

I was refactoring it because I needed specific functionality, less then the simple
plugin gave. This was the result of that.




###TODOS
* Accept jQuery elements
* Allow shorten to work with height based options.



