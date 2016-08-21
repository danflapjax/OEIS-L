# OEIS-L

Run as `node OEISLinterpreter.js program input input...`

# Documentation

Programs are interpreted using iterative regexes. Currently programs can only be one line.
The last iteration that changes is the output.

## Input

    i(n)

This becomes the `n`th input (index 0)

Example with the input `one 2 three i(0)`:

    i(0), i(2), i(i(1)), i(3)
    one, three, i(2), i(0)
    one, three, three, one

## A-functions

    A######(n)

This evaluates to the corresponding A function with the input n from the OEIS

For conciceness/code golf `A000001(1)` and `A1(1)` are equivalent.

Many more features are to come.
