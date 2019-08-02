/*
* @param callback {Function} // Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise. It accepts three arguments:
  - element
    The current element being processed in the array.
  - index (Optional)
The index of the current element being processed in the array.
  - array (Optional) The array filter was called upon.
  
  - Important return value {any} => which will be coerced into a boolean
  
 @param thisArg {any} Optional
 @return Value {any}
  to use as this when executing callback.
* */

const test = ['a', 'b', 'c'];
console.log('filer result: ', test.filter(i => ~ i.search('a')));