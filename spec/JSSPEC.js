
describe("JS.js Library", function(){

    it("isEmptyObject", function(){
        // array
        expect(JS.isEmptyObject([])).toBe(true);
        expect(JS.isEmptyObject([1,2,3])).toBe(false);
        // object
        expect(JS.isEmptyObject({})).toBe(true);
        expect(JS.isEmptyObject({a:1})).toBe(false);
        // in error
        expect(function(){JS.isEmptyObject(1);}).toThrow(JS.ASSERT.AssertException);
        expect(function(){JS.isEmptyObject("");}).toThrow(JS.ASSERT.AssertException);
    });


    it("extend", function(){
        expect(JS.extend({a:1},{b:2})).toEqual({a:1,b:2});
        expect(JS.extend({a:1},{b:2,c:{d:3}})).toEqual({a:1,b:2,c:{d:3}});
//        expect(JS.extend("",1)).toEqual({a:1,b:2});
    });

    describe("IS",function(){
        it("object",function(){
            expect(JS.IS.object({})).toBe(true);
            expect(JS.IS.object([])).toBe(true);
            expect(JS.IS.object("aaa")).toBe(false);
            expect(JS.IS.object(111)).toBe(false);
        });

        it("type",function(){
            expect(JS.IS.type("aaa","[object String]")).toBe(true);
            expect(JS.IS.type([],"[object Array]")).toBe(true);
            expect(JS.IS.type(function(){},"[object Function]")).toBe(true);
        });
    });

    describe("ASSERT",function(){
        expect(JS.ASSERT.condition(true,false,"message")).toThrow(JS.ASSERT.AssertException);
        expect(JS.ASSERT.condition(true,true,"message")).not.toThrow(JS.ASSERT.AssertException);

        expect(JS.ASSERT.condition(1,2,"message")).toThrow(JS.ASSERT.AssertException);
        expect(JS.ASSERT.condition(1,1,"message")).not.toThrow(JS.ASSERT.AssertException);

    });


});