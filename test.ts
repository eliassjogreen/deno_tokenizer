import { runTests, test } from "https://deno.land/x/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { Rule, Token, Tokenizer } from "./mod.ts";

test(function matchesSingleRegex() {
    const tokenizer = new Tokenizer("0123456789", [
        { name: "DIGITS", pattern: /\d+/ }
    ]);

    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "DIGITS", value: "0123456789" }
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function matchesMultipleRegex() {
    const tokenizer = new Tokenizer("0123456789 0123456789", [
        { name: "DIGITS", pattern: /\d+/ },
        { name: "SPACE", pattern: / / }
    ]);

    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "DIGITS", value: "0123456789" }
    });
    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "SPACE", value: " " }
    });
    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "DIGITS", value: "0123456789" }
    });
    assertEquals(tokenizer.next(), { done: true, value: undefined });
});

test(function matchesSingleString() {
    const tokenizer = new Tokenizer("0123456789", [
        { name: "DIGITS", pattern: "0123456789" }
    ]);

    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "DIGITS", value: "0123456789" }
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function matchesMultipleString() {
    const tokenizer = new Tokenizer("0123456789 0123456789", [
        { name: "DIGITS", pattern: "0123456789" },
        { name: "SPACE", pattern: " " }
    ]);

    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "DIGITS", value: "0123456789" }
    });
    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "SPACE", value: " " }
    });
    assertEquals(tokenizer.next(), {
        done: false,
        value: { name: "DIGITS", value: "0123456789" }
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function ignoresSingleRegex() {
    const tokenizer = new Tokenizer("0123456789", [
        { name: "", pattern: /\d+/ }
    ]);

    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function ignoresMultipleRegex() {
    const tokenizer = new Tokenizer("0123456789 0123456789", [
        { name: "", pattern: /\d+/ },
        { name: "", pattern: / / }
    ]);

    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function ignoresSingleString() {
    const tokenizer = new Tokenizer("0123456789", [
        { name: "", pattern: "0123456789" }
    ]);

    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function ignoresMultipleString() {
    const tokenizer = new Tokenizer("0123456789 0123456789", [
        { name: "", pattern: "0123456789" },
        { name: "", pattern: " " }
    ]);

    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
    assertEquals(tokenizer.next(), {
        done: true,
        value: undefined
    });
});

test(function testIterable() {
    const tokenizer = new Tokenizer("0123456789 0123456789", [
        { name: "DIGITS", pattern: /\d+/ },
        { name: "SPACE", pattern: / / }
    ]);

    assertEquals(
        [...tokenizer],
        [
            { name: "DIGITS", value: "0123456789" },
            { name: "SPACE", value: " " },
            { name: "DIGITS", value: "0123456789" }
        ]
    );
});

runTests();
