

if(!Array.remove){
    Array.remove = function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };
}



var JS = {
    debug:false
    ,debugDetail:5
    ,empty:{}
    ,isEmptyObject:function(obj){
        JS.ASSERT.isTrue(JS.IS.object(obj),"Not an Object");
        for(var propName in obj){
            if(obj.hasOwnProperty(propName)){
                return false;
            }
        }
        return true;
    }
    ,timestamp:function(){return (new Date()).valueOf();}
    ,log:function(msg,lvl){lvl=lvl||5;if (JS.debug && window["console"] && lvl<=JS.debugDetail){console.log(msg);}}
    ,extend:function (source,target){
        //if(!target){target = this;}
        for(var propName in source){
            if(source.hasOwnProperty(propName)){
                try{
                    JS.log("applying prop["+propName+"]");
                    try{target[propName] = source[propName];}catch(exc){JS.log("error:" + exc.message);}
                    if(typeof(source[propName]) == 'object'){
                        JS.log("recurse into " + propName);
                        JS.extend(source[propName],target[propName]);
                    }
                }catch(ex){
                    // ignore errors, uncomment for debugging
                    JS.log("error extending object: " + ex.message);
                }
            }
        }
        return target;
    }

    ,IS:{
        object:function(obj){
            return obj === Object(obj);
        }
        ,type:function(object,type){
            var boolean = (Object.prototype.toString.call(object) == type);
            return boolean;
        }
    }
    ,ASSERT:{
        AssertException:function AssertException(message) {
            this.message = message;
        }
        ,expressionIs:function(exp,expected,message){
            if(exp != expected){
                throw new JS.ASSERT.AssertException(message);
            }
        }
        ,isTrue:function(exp,message){
            return JS.ASSERT.expressionIs(exp,true,message);
        }
        ,isFalse:function(exp,message){
            return JS.ASSERT.expressionIs(exp,false,message);
        }
    }
    ,DOM:{
        /**
         * Wrapper to getElementById
         * also accepts NODEs
         * so allows elements to be passed by ID or NODE
         * @param el
         */
        getElement:function(el){
            return (typeof el === "string")?document.getElementById(el):el;
        }
        ,getElementsByClass:function(className,parent,tag) {
            parent = parent || document;
            tag = tag || "*";
            var classElements = [];
            var els = parent.getElementsByTagName(tag);
            var elsLen = els.length;
            var pattern = new RegExp('(^|\\\\s)'+className+'(\\\\s|$)');
            for (i = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                    classElements.push(els[i]);
                }
            }
            return classElements;
        }
        /**
         * Create an ELement and append it to Parent with properties
         * @param {Object} tagname Required eg: div, script, option
         * @param {Object} [attribts] Optional, JSON format properties for element
         * @param {Object} [p] Optional, parent, if set element will be added to this
         */
        ,createElement:function(tagname,attribs,parent){
            var el = document.createElement(tagname);
            if (attribs){JS.extend(attribs, el);}
            if (parent) {
                parent = JS.DOM.getElement(parent);
                parent.appendChild(el);
            }
            return el;
        }
        ,show:function(el){
            el = JS.DOM.getElement(el);
            el.style.display = "block";
        }
        ,hide:function(el){
            el = JS.DOM.getElement(el);
            el.style.display = "none";
        }
        ,DATA:{
            getDataAttribute:function(element,name,defaultValue){
                var data = element.getAttribute("data-" + name);
                return data || defaultValue;
            }

            /**
             * Make sure to pass a default value, or you will get the config object if argPath fails
             *
             * @param element
             * @param attrName - attribute containing object name (default:"config")
             * @param argPath - sub-object path (optional, null -> returns full config object)
             * @param defaultValue - value returned if config object does NOT exist
             * @return {*}
             */
            ,getConfigObject:function(element, configAttributeName){
                configAttributeName = configAttributeName || "config";
                var configObjName = JS.DOM.DATA.getDataAttribute(element,configAttributeName,undefined);
                var configObj = (configObjName)?JS.OBJECT.getProperty(window,configObjName):undefined;
                return  configObj;
            }
            /**
             *
             * @param element
             * @param configAttributeName
             * @param argPath
             * @param defaultValue
             * @return {*}
             */
            ,getConfigParam:function(element, configAttributeName, argPath, defaultValue){
                configAttributeName = configAttributeName || "config";
                var configObj = JS.DOM.DATA.getConfigObject(element,configAttributeName);
                var returnValue = (configObj && argPath)?JS.OBJECT.getProperty(configObj,argPath):undefined;
                return  returnValue || defaultValue ;
            }
            /**
             * Get data from attribute or element config object
             * @param element
             * @param dataName
             * @return String
             */
            ,getElementData:function(element, dataName, configAttributeName, defaultValue){
                configAttributeName = configAttributeName || "config";
                defaultValue = JS.DOM.DATA.getDataAttribute(element,dataName,defaultValue);
                defaultValue = JS.DOM.DATA.getConfigParam(element,configAttributeName,dataName,defaultValue);
                return defaultValue;
            }
        }
        ,FORM:{
            getValue:function(el){
                el = JS.DOM.getElement(el);
                var type = el.tagName;
                switch (type){
                    case "INPUT":
                    case "TEXTAREA":
                    case "OPTION":
                        return el.value;
                        break;
                    case "CHECKBOX":
                        return (el.checked)?el.value:"";
                        break;
                    case "SELECT":
                        var options = el.options;
                        var value = [];
                        for(var i = 0; i < options.length; i++){
                            if(options[i].selected){
                                value.push(options[i].value);
                            }
                        }
                        return value.join(",");
                        break;
                    default:
                        throw new Error("unknown form element type: " + type);
                }
            }
        }
    }
    ,STRING:{
        reverse:function(str){return str.split("").reverse().join("");}
        ,trim:function(str){return str.replace(/^\s+|\s+$/g, '');}
        /**
         * Simple string format
         * eg: format("my string %1 great %2","is",2)
         * @param string
         * @param [values]
         */
        ,format:function(string) {
            var args = arguments;
            //alert("%([1-" + arguments.length + "])");
            var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
            return String(string).replace(pattern, function(match, index) {
                return args[index];
            });
        }
    }
    ,COOKIE:{
        read:function(n,defaultValue) {
            var c = document.cookie;
            if (c) {
                var i = c.indexOf(n + '=');
                if (i > -1) {
                    var j = c.indexOf(';', i);
                    return c.substring(i + n.length + 1, ((j<0)?c.length:j) );
                }
            }
            return defaultValue;
        }
        ,write:function(name,value,days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                expires = "; expires="+date.toGMTString();
            }
            document.cookie = name+"="+value+expires+"; path=/";
        }
    }
    ,JSON:{
        toCookie:function(jsonObject,cookieName /*,[daysTillCookieExpires]*/){
            var daysTillCookieExpires = arguments[2];
            var stringObject = JSON.stringify(jsonObject); // convert json to string
            var base64Object = JS.BASE64.encode(stringObject); //String to base64
            JS.COOKIE.write(cookieName,base64Object,daysTillCookieExpires); // store cookie
        }
        ,fromCookie:function(cookieName){
            var base64Object = JS.COOKIE.read(cookieName,"e30="); // get cookie or default = {}
            var stringObject = JS.BASE64.decode(base64Object); // convert base64 to string
            var jsonObject = JSON.parse(stringObject); // convert string to json
            return jsonObject;
        }
    }
    ,ARRAY:{
        fromCollection:function(collectionObj){
            try{
                // IE8 has broken this...!
                return Array().slice.call(collectionObj);
            }catch(ex){
                //so we need this
                var arr = [];
                for(var i = 0; i < collectionObj.length ; i++){
                    arr.push(collectionObj[i]);
                }
                return arr;
            }
        }
        ,FILTERS:{
            /**
             * generate filter function
             * verifies iterated element attribute isEqual to value
             * NB: is case sensitive
             */
            isAttribute:function (name,value /** [,value...] **/){
                var values = JS.ARRAY.fromCollection(arguments).slice(1);
                return function(el,ind,arr){
                    return el[name] && values.foldr(function(val,start){return start || el[name]==val;},false);
                    //return el[name] && el[name]==value;
                };
            }
            /**
             * Return a function to filter an array
             * @param {Object} text to test array[index]
             */
            ,startsWith:function(text){
                return function(el,ind,arr){
                    JS.log("Testing[" + arr[ind]+ "]");
                    return (arr[ind].indexOf(text,0) === 0);
                };
            }
            ,log:function(el,ind,arr){
                JS.log(ind + " = " + arr[ind]);
            }
        }
        ,MAP:{
            trim:function(el,ind,arr){
                //arr[ind] = arr[ind].
                if(el instanceof Array){
                    return el.map(JS.ARRAY.MAP.trim);
                }
                return JS.String.trim(arr[ind]);
            }
            ,recurseWith:function(func,thisArg){
                return function(el,ind,arr){
                    if(el instanceof Array){
                        return el.map(JS.ARRAY.MAP.recurseWith(func));
                    }else{
                        return func.call(thisArg,el);
                    }
                }
            }
        }
    }
    ,BASE64:{
        key_Str:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        ,encode:function(input) {
            var keyStr = JS.BASE64.key_Str;
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
            } while (i < input.length);

            return output;
        }
        ,decode:function(input) {
            var keyStr = JS.BASE64.key_Str;
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            } while (i < input.length);

            return output;
        }
    }
    ,OBJECT:{
        /**
         * Get an object property,
         * allows a property chain in the name
         * @param object
         * @param name
         * @return {*}
         */
        getProperty:function(object,name){
            // todo: regex validate name
            name = name.split(".");
            object = object || window;
            while(name.length){
                object = (object)?object[name.shift()]:undefined;
            }
            return object;
        }
        ,
        /**
         * Set a property on an object
         *
         * Can be used to guarantee a namespace exists.
         * eg: JS.OBJECT.setProperty(window,"my.long.name.space.object")
         *
         * @param object
         * @param path property name, allows a chain of property names (eg: "foo.bar.meg.mog")
         * @param value optional, defaults to an empty object
         * @param extend optional, use to inject instead of overwrite value, defaults to false
         * @return {*}
         */
        setProperty:function(object,path,value,extend){
            // todo: regex validate path
            JS.ASSERT.isTrue((arguments.length >= 2),"setProperty must have at least 2 arguments");
            path = path.split(".");
            value = value || {};
            extend = extend || false;

            while(path.length){
                var n = path.shift();
                if(object[n] == undefined){
                    object[n] = {};
                }
                if(!(path.length)){
                    if(extend && JS.IS.object(object[n])){
                        object[n] = JS.extend(object[n],value);
                    }else{
                        object[n] = value;
                    }
                }
                object = object[n];
            }
            return object;
        }
        ,createFromArgPairs:function(){
            JS.ASSERT.isTrue((arguments.length % 2 == 0),"createFromArgPairs: unpaired arguments can not be used to populate an object");
            var args = JS.ARRAY.fromCollection(arguments);
            var obj = {};
            while(args.length > 0){
                var key = args.shift();
                var value = args.shift();
                obj[key] = value;
            }
            return obj;
        }
    }
    ,FUNCTION:{
        bind:function(method, object){
            return function() { return method.apply(object, arguments); };
        }
        ,createDelegate:function createDelegate(argsArray/*,thisp*/){
            //var argsArray = [].slice.call(arguments, 0);
            //debugger;
            var func = this;
            var thisp = arguments[2] || arguments.caller;
            return function(){
                //debugger;
                func.apply(thisp, argsArray);
            };
        }

        ,curry:function()
        {
            var method = this, args = Array.prototype.slice.call(arguments);
            return function()
            {
                return method.apply(this, args.concat(Array.prototype.slice.call(arguments)));
            };
        }


        ,
        /**
         * partial function
         * allows pre-population of function arguments
         * allows specification of injectable values using undefined
         * adds remaining arguments to function call
         */
        partial:function partial(f,args /*,thisp*/){
//            var f = this, args = Array.prototype.slice.call(arguments);
            var thisp = arguments[3];
            return function(){
                var args2 = Array.prototype.slice.call(arguments);
                var args3 = [];
                for(var i = 0; i < args.length; i++ ){ // replace undefined arguments
                    args3[i] = (args[i]===undefined)?args2.shift():args[i];
                }
                args3 = args3.concat(args2); // add remaining arguments
                return f.apply(thisp || this, args3); // now call func in current scope with joined arguments
            };
        }

    }
    ,REGEX:{
        varName:/^[_$A-Za-z]$/
    }
};

JS.OBJECT.isString = JS.FUNCTION.partial(JS.OBJECT.isType, [undefined, "[object String]"]);
JS.OBJECT.isArray = JS.FUNCTION.partial(JS.OBJECT.isType, [undefined, "[object Array]"]);
JS.OBJECT.isFunction = JS.FUNCTION.partial(JS.OBJECT.isType, [undefined, "[object Function]"] );

// #############################################
// ###### Utility functions#####################
// #############################################

var $id = JS.DOM.getElement;
var $class = JS.DOM.getElementsByClass;


// if TM Functions can check for THIS
// then use THIS if available
// or pass value into function
// therefore can be used to extend String
// or called directly
// ie: JS.STRING.reverse(myString)
// or given a shortcut
// ie: var reverse = JS.STRING.reverse;
// or wrapped in a partial
// var logFormat = JS.STRING.format.partial("Time:%1, Log:%2")

// ?? all node querying functions shoudl return an ARRAY?
// that way all node processing functions can expect an array
// or change 1 node into an array of 1 node

// use foldr to generate a boolean, instead of using filter?



//Sizzle( String selector, DOMElement|DOMDocument context )
//
//The primary method of calling Sizzle ? pass in a selector and an optional context (if no context is provided the root ?document? is used). Runs the specified selector and returns an array of matched DOMElements.
//Sizzle( String selector, DOMElement|DOMDocument context, Array results )
//
//An alternative to the previous method of calling Sizzle ? pass in an existing array and the results will be appended on to that array.
//Sizzle.matches( String selector, Array<DOMElement> set )
//
//Takes in a set of DOMElements, filters them against the specified selector, and returns the results. The selector can be a full selector (e.g. ?div > span.foo?) and not just a fragment.



// JS.FUNCTION.cascade, like dojo.connect
//##############################################
// pass results of first function to second etc, then to third, etc
// this can be used with partial to create cascades of utility functions
// ie: trim -> split.partial(",") -> join("|")
// also allows verify functions to be added at start / end
// NB: throw exceptions when bad errors...!