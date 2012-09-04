JS.js
=====

This is my collection of simple, name spaced, utility functions for Javascript from the last few years.

Recently I have removed quite a few of my implementations, as Underscore has a better version.
So this library is now dependant on Underscore.

Also, if you want to use the JSON functions, you will need a JSON library, eg: Douglas Crockford's.

Validator.js
---------

This library is currently used to power [Validator.js][].

Validator is a highly configurable and easily extended API for validating forms.
Simply add a few tags to specify your tests, and it does the rest.
It should work with almost every framework and form available.


[Validator.js]: https://github.com/rossillingworth/Validator.js


API
---

The Following is a list of the available functions, generated using the JS.OBJECT.document function.

I will get round to adding a short description to each soon.

```javascript
JS.debug
JS.debugDetail
JS.deprecated
JS.timestamp
JS.log
JS.ASSERT.AssertException
JS.ASSERT.is
JS.ASSERT.isTrue
JS.ASSERT.isFalse
JS.DOM.getElement
JS.DOM.getElementsByClassName
JS.DOM.createElement
JS.DOM.show
JS.DOM.hide
JS.DOM.isVisible
JS.DOM.DATA.getDataAttribute
JS.DOM.DATA.getConfigObject
JS.DOM.DATA.getConfigParam
JS.DOM.DATA.getElementData
JS.DOM.FORM.getFormElements
JS.DOM.FORM.getValue
JS.STRING.reverse
JS.STRING.trim
JS.STRING.format
JS.COOKIE.read
JS.COOKIE.write
JS.JSON.toCookie
JS.JSON.fromCookie
JS.ARRAY.fromCollection
JS.ARRAY.remove
JS.ARRAY.recursiveFunctionCallGenerator
JS.ARRAY.FILTERS.isAttribute
JS.ARRAY.FILTERS.startsWith
JS.ARRAY.FILTERS.log
JS.BASE64.key_Str
JS.BASE64.encode
JS.BASE64.decode
JS.OBJECT.getProperty
JS.OBJECT.setProperty
JS.OBJECT.createFromArgPairs
JS.OBJECT.recursiveFunctionCallGenerator
JS.OBJECT.walk
JS.OBJECT.document
JS.FUNCTION.partial
JS.FUNCTION.overload
```


Tests
-----

The functions here are all in regular use, so a lot of manual testing has been done.
I have added the beginning of a test suite, but more are needed.

