JSON is JS object notation, used for text format vs JS objext is a Data st
const jsonString = '{"name": "Alice", "age": 25}';
const user = { name: "Alice", age: 25 };

JSON is the "shipping container." It’s a universal text-based standard that any programming language (Python, Java, etc.) can read.
JS Objects are the "tools." Once you parse that text into an object, your code can actually interact with the data, loop through it, or run logic.

jsonwebtoken

Used to generate JWT token.

JWT =

digital identity card

Backend creates it.
Frontend stores it.
Backend verifies it later.
