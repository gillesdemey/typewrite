Typewrite
=========

A simple javascript file to simulate text input.

Usage
=========
Include the javascript file.

Call the typewriter's cycle function:

```javascript
typewriter.Typewriter.cycle("typewriter", ["great taste.", "awesome ideas.", "a love for code.", "an obsession with details."]);
```


It looks for a DOM elements with an id called "typewriter", which is the first parameter.
The other parameter is an array containing the strings you want it to construct and deconstruct.

or the write function, which supports a custom callback method.

```javascript
typewriter.Typewriter.write("typewriter", "great taste.", function(){ callback() });
```


or the blink function

```javascript
typewriter.Typewriter.blink("typewriter");
```