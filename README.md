# AxShorten


##DESCRIPTION
AxShorten is a simple shorten plugin that simply shortens a block of text.

It currently does this by setting a character limit, but I have plans to add functionality for height based shorten functionality.



##EXAMPLE USAGE

```
  // Get Reference to  Element first
  var exampleElement = document.querySelector('.element-container');
  new AxShorten({elem: exampleElement, characterLimit: 150});

  /* This will shorten the element to 150 characters.


  The default character Limit is 100 so you can leave that as so by doing the following  */

  new AxShorten({elem: exampleElement});

```