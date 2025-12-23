# CUE Syntax Highlighting Test

This is a test file to demonstrate CUE syntax highlighting in Markdown code blocks.

## Basic CUE Example

```cue
package example

// This is a comment
import "list"

// Basic types
name: string
age: int
price: float
active: bool

// Struct definition
person: {
    name: "John Doe"
    age: 30
    email: "john@example.com"
    address: {
        street: "123 Main St"
        city: "New York"
    }
}

// List example
colors: ["red", "green", "blue"]
numbers: [1, 2, 3, 4, 5]

// Conditional logic
if age > 18 {
    adult: true
}

// Function-like structure
calculate: (x: int, y: int): int {
    return x + y
}
```

## Advanced CUE Features

```cue
// Complex struct with constraints
user: {
    // Required fields
    id:   = string
    name: = string

    // Optional fields with defaults
    role: *"user" | "admin" | "guest"
    active: *true | false

    // Constraints
    age: >18 & <100

    // Computed fields
    fullName: "\(name) (#\(id))"
}

// List comprehensions
evenNumbers: [for x in [1,2,3,4,5] if x % 2 == 0 x]
```

## Error Handling

```cue
// This should show syntax errors
invalid: {
    // Missing colon
    field "value"

    // Invalid type
    amount: "not a number" // when it should be int

    // Unclosed bracket
    items: [1, 2, 3
}
```

## Comments Test

```cue
/*
 * This is a block comment
 * It should be highlighted differently
 * from regular code
 */

// Single line comment
// Another comment line
```

## Operators and Keywords

```cue
// Go to declaration works also
val: #GenericType
// Logical operators
condition: true && false || (x == y)

// Arithmetic operators
result: (10 + 5) * 2 - 3 / 4

// Comparison operators
valid: age >= 18 && age <= 65
```

This test file demonstrates various CUE language features that should be properly syntax highlighted when the extension is working correctly.
