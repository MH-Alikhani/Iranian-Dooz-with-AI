# simpleClass.js

JavaScript inherently uses **prototypal inheritance**, but the approach here mimics **classical object-oriented inheritance** found in languages like Java or C++. This is achieved through a **self-executing function (IIFE)** that defines a `Class` function with an `extend` method, allowing for the creation of subclasses and method overriding, with parent method access via a special `_super` keyword.

## Key Components and Concepts

### 1. **Initialization Flag**

```javascript
var initializing = false;
```

- This flag helps distinguish between prototype setup and actual object instantiation, ensuring that the `init` method is not called during prototype creation.

### 2. **Function Testing with `fnTest`**

```javascript
var fnTest = /xyz/.test(function () {
  xyz;
})
  ? /\b_super\b/
  : /.*/;
```

- A regular expression that checks if the JavaScript engine supports named functions (i.e., functions with names like `xyz` inside them). If so, it enables detection of `_super` references when overriding methods.

### 3. **Creating the `Class` Constructor**

```javascript
this.Class = function () {};
```

- Defines the base `Class` constructor in the global scope (`this`). This will act as the foundation for all subclasses created using this system.

### 4. **Class Extension Mechanism**

```javascript
Class.extend = function (prop) { ... };
```

- The `extend` method allows new classes (subclasses) to be created by extending existing ones. It takes a `prop` object, which contains properties and methods to be added to the subclass.

### 5. **Setting up the Prototype Chain**

```javascript
var _super = this.prototype;
initializing = true;
var prototype = new this();
initializing = false;
```

- `_super` holds a reference to the superclass's prototype, allowing access to the parent class's methods.
- A new object (`prototype`) is created from the current class, but `initializing = true` ensures the `init` method is not invoked during this process.

### 6. **Method Overriding with `_super`**

```javascript
prototype[name] =
  typeof prop[name] === "function" &&
  typeof _super[name] === "function" &&
  fnTest.test(prop[name])
    ? (function (name, fn) {
        return function () {
          var tmp = this._super;
          this._super = _super[name];
          var ret = fn.apply(this, arguments);
          this._super = tmp;
          return ret;
        };
      })(name, prop[name])
    : prop[name];
```

- This critical block allows for **method overriding** while providing access to the superclass's method using `_super`. If both the subclass and superclass define a method, the subclass method is wrapped in a function that temporarily assigns `_super`, allowing the parent method to be called.

### 7. **Subclass Constructor**

```javascript
function Class() {
  if (!initializing && this.init) {
    this.init.apply(this, arguments);
  }
}
```

- The constructor for the subclass checks if the object is being instantiated (not just initializing the prototype). If so, and if there is an `init` method, it is called, replicating the constructor behavior seen in classical OOP.

### 8. **Assigning the Prototype and Constructor**

```javascript
Class.prototype = prototype;
Class.prototype.constructor = Class;
```

- The new prototype, containing inherited methods, is assigned to the subclass's prototype, and the `constructor` is set to ensure the correct constructor reference for new instances.

### 9. **Recursive Extension**

```javascript
Class.extend = arguments.callee;
```

- This ensures that subclasses also inherit the `extend` method, enabling further subclassing. The `arguments.callee` allows recursive extension by pointing `Class.extend` back to itself.

### 10. **Returning the New Class**

```javascript
return Class;
```

- Finally, the newly created subclass is returned, ready to be instantiated or further extended.

## Example of Usage

```javascript
// Defining a base class 'Person'
var Person = Class.extend({
  init: function (isDancing) {
    this.dancing = isDancing;
  },
  dance: function () {
    return this.dancing;
  },
});

// Creating a subclass 'Ninja' extending 'Person'
var Ninja = Person.extend({
  init: function () {
    this._super(false); // Calls parent class's init method
  },
  dance: function () {
    return this._super() + " Ninja-style!";
  },
});

// Using the classes
var p = new Person(true);
console.log(p.dance()); // Output: true

var n = new Ninja();
console.log(n.dance()); // Output: "false Ninja-style!"
```

- **Person Class**: A class with an `init` method that sets the `dancing` property and a `dance` method that returns the value of `dancing`.
- **Ninja Class**: Extends `Person`, overrides the `init` method to always initialize with `false` and overrides `dance` to append `" Ninja-style!"` while calling the parent method using `_super()`.

## Key Takeaways

1. **Classical Inheritance in JavaScript**:

   - The code provides a way to implement inheritance that mimics classical object-oriented languages like Java.

2. **Method Overriding with `_super`**:

   - Allows subclasses to override parent methods while still accessing the original functionality via `_super`, offering more flexibility in code structure.

3. **Prototype Chain Setup**:

   - Leverages JavaScript's natural prototypal inheritance, but with additional mechanisms to support classical inheritance concepts such as constructors and method inheritance.

4. **Dynamic Method Wrapping**:

   - Uses function closures to dynamically wrap subclass methods, enabling them to call the parent class methods even after overriding them.

5. **Extendable Classes**:
   - Every class created through this system can itself be extended, supporting deep inheritance chains.

This pattern provides a robust foundation for structuring JavaScript applications using an OOP approach that feels more familiar to developers with experience in classical languages.
