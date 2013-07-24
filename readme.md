## json-meld

This is a JSON extending stream.

it inherits from the core transform stream class.

Pass it any number of readable json streams and pipe() to a writable stream

the only constraint is that you must set json-meld with the number of expected streams
otherwise it will default to 0 and push each update to the object as it is extended.

e.g.:

var fs = require('fs');
var file1 = fs.createReadStream('my-file.json');
var file2 = fs.createReadStream('my-other-file.json');

var meld = require('json-meld')(2);

meld.pipe(stdout);

file1.pipe(meld);
file2.pipe(meld);


be aware that to get the best results you will need to ensure that the json in your json file is an object. Mixing multiple arrays will cause for duplicate attributes to be cloberred.

e.g.:

file1:

{
  "file1" : {
    "stuff" : [
      "item-1",
      "item-2",
      "item-3"
    ]
  }
}

& file2:

{
  "file2" : {
    "some-other" : "stuff"
  }
}

would meld to make:

{
  "file1" : {
    "stuff" : [
      "item-1".
      "item-2",
      "item-3"
    ]
  },
  "file2" : {
    "some-other" : "stuff"
  }
}
