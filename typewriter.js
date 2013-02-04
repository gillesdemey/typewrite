/**
* @author Gilles De Mey
*/

/* typewriter namespace */
var typewriter = {};

typewriter.Typewriter = function()
{

  var context; // the context node we'll be working with
  a_sentences = []; // the array holding the sentences
  c_index = 0; // current index we are processing

  /* typewriter variables, change to your desire */
  var options = {
    blink_interval : 600,
    type_interval : 65,
    construct_timeout : 600,
    deconstruct_timeout : 1500,
    caret_symbol : '|',
    random : true
  };

  typewriter.init = function(context_id, sentences) {

    /* set the context to work with */
    context = context_id;
    // console.log("context set");

    /* set the sentences array */
    a_sentences = sentences;

    /* start blinking the cursor */
    typewriter.blink(context);
    // console.log("blinking...");
  };

  /* blink function */
  typewriter.blink = function(context_id, ms)
  {

    /* default 600ms interval */
    if ( typeof(ms) === 'undefined') ms = options.blink_interval;

    var blink = false;
    var c = context_id;

    /* blink every x milliseconds */
    var timer = setInterval(function()
    {
      doBlink(c);
    }, ms);

    /* bling, bling! */
    doBlink = function(c)
    {

      if ( blink === true )
      {
        /* subtract caret */
        removeCursor(c);
        blink = false;
      } else {
        /* add caret */
        addCursor(c);
        blink = true;
      }

    };

    removeCursor = function(c) {
      document.getElementById(c).innerHTML = document.getElementById(c).innerHTML.replace(options.caret_symbol, '');
    };

    addCursor = function(c) {
      document.getElementById(c).innerHTML += options.caret_symbol;
    };

    type = function(s) {
      clearInterval(timer);
      document.getElementById(c).innerHTML = s + options.caret_symbol;
    };

  };

  typewriter.typewrite = function(context_id, sentences)
  {

    if ( typeof( timeout ) === 'undefined' ) timeout = options.construct_timeout;

    /* randomness if true */
    if ( options.random === true ) {
      typewriter.random();
    }

    /* wait a few seconds before constructing */
    setTimeout(function(){

      typewriter.construct(a_sentences[c_index], function()
      {
        setTimeout(function()
        {
          typewriter.deconstruct(a_sentences[c_index]);
        }, options.deconstruct_timeout);
      });

    }, timeout);

  };

  /* count down the string to 0 */
  typewriter.deconstruct = function(s)
  {

    var sentence = s;
    // console.log("deconstruction ", s);

    /* remove character every x milliseconds */
    var timer = setInterval(function()
    {
      removeLastCharacter();
    }, options.type_interval);

    function removeLastCharacter()
    {

      /* check if not out of range */
      if ( sentence.length > 0 )
      {

        /* update variable */
        sentence = sentence.slice(0, -1);

        /* update the context element */
        // console.log(sentence, sentence.length);
        type(sentence);

      } else {

        /* stop timer */
        clearInterval(timer);

        /* done removing all characters */
        // console.log("deconstruction complete!");

        /* subtract caret */
        removeCursor(context);

        /* start blinking again */
        typewriter.blink(context);

        /* increase current index by one, modulo the length of the array to loop it */
        c_index = (c_index + 1) % a_sentences.length;

        // console.log(c_index);
        typewriter.typewrite(context, a_sentences);
      }

    }
  };

  typewriter.construct = function(s, callback)
  {

    // console.log("constructing ", s);
    var sentence = s;
    var c_sentence = ""; // sentence in construction

    var index = 1;

    /* add character every x milliseconds */
    var timer = setInterval(function()
    {
      addLastCharacter(index);
    }, options.type_interval);

    function addLastCharacter(i)
    {
      /* check if not out of range */
      if ( index != s.length + 1 )
      {
        /* update variable */
        c_sentence = sentence.slice(0, i);
        type(c_sentence);
        // console.log(c_sentence, index);
        index++;
      } else {
        clearInterval(timer);
        // console.log("construction complete!");
        removeCursor(context);
        typewriter.blink(context);

        if ( typeof( callback ) != 'undefined' ) callback();

      }
    }

  };

  typewriter.random = function() {
    c_index = Math.floor( ( Math.random() * a_sentences.length ) );
  };

  return {
    cycle : function(context_id, sentences) { typewriter.init(context_id, sentences); typewriter.typewrite(context_id, sentences); },
    write : function(context_id, sentence, callback) { typewriter.init(context_id, sentence); typewriter.construct(sentence, callback); },
    blink : function(context_id, ms) { typewriter.blink(context_id, ms); }
  };

}();