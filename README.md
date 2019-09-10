# Tokenizer
[![Actions Status](https://github.com/eliassjogreen/deno_tokenizer/workflows/Tests/badge.svg)](https://github.com/eliassjogreen/deno_tokenizer/actions)
[![GitHub license](https://img.shields.io/github/license/eliassjogreen/deno_tokenizer)](https://github.com/eliassjogreen/deno_tokenizer)

A simple tokenizer for deno.

## Example
```TypeScript
import { Tokenizer } from "https://deno.land/x/tokenizer/mod.ts";

const tokenizer = new Tokenizer("abc 123 HELLO", [
    { type: "HELLO",  pattern: "HELLO" },
    { type: "WORD",   pattern: /[a-zA-Z]+/ },
    { type: "DIGITS", pattern: /\d+/ },
    { type: "SPACE",  pattern: / /, ignore: true } // Or leave type blank and remove "ignore: true"
]);

// The first option:
console.log(...tokenizer);

// The second option:
// while (!tokenizer.done) {
//     console.log(tokenizer.next().value);
// }

// If you used the first option:
// => [ { type: "WORD", value: "abc", position: { start: 0, end: 3 } },
//      { type: "DIGITS", value: "123", position: { start: 4, end: 7 } },
//      { type: "HELLO", value: "HELLO", position: { start: 8, end: 13 } } ]

// If you use the second option:
// => { type: "WORD", value: "abc", position: { start: 0, end: 3 } }
// => { type: "DIGITS", value: "123", position: { start: 4, end: 7 } }
// => { type: "HELLO", value: "HELLO", position: { start: 8, end: 13 } }
```

## TODO
- [x] Custom patterns using functions
- [x] Add position information to Token
- [x] Array patterns (Multiple patterns for the same rule)
- [ ] Better error handling
- [ ] Documentation
- [ ] Examples
- [ ] More and better tests