
describe("JS.js Library", function(){

//    it("isEmptyObject", function(){
//        // array
////        expect(JS.isEmptyObject([])).toBe(true);
//        expect(JS.extend({a:1},{b:2})).toEqual({a:1,b:2});
//    });

    describe("ASSERT",function(){

        it("is", function(){
            expect(function () {JS.ASSERT.is(true,false,"test should fail")}).toThrow("test should fail");
            expect(function () {JS.ASSERT.is(true,true,"test should pass")}).not.toThrow("test should pass");
            
            expect(function () {JS.ASSERT.is(1,2,"test should fail")}).toThrow("test should fail");
            expect(function () {JS.ASSERT.is(1,1,"test should pass")}).not.toThrow("test should pass");
//
            expect(function () {JS.ASSERT.is("foo","bar","test should fail")}).toThrow("test should fail");
            expect(function () {JS.ASSERT.is("foo","foo","test should pass")}).not.toThrow("test should pass");

            expect(function () {JS.ASSERT.is({a:1},{b:2},"test should fail")}).toThrow("test should fail");
            expect(function () {JS.ASSERT.is({a:1},{a:1},"test should pass")}).not.toThrow("test should pass");
        });

        it("isTrue", function(){
            expect(function () {JS.ASSERT.isTrue((1 == 0),"test should fail")}).toThrow("test should fail");
            expect(function () {JS.ASSERT.isTrue((1==1),"test should pass")}).not.toThrow("test should pass");
        });

        it("isFalse", function(){
            expect(function () {JS.ASSERT.isFalse((1==1),"test should fail")}).toThrow("test should fail");
            expect(function () {JS.ASSERT.isFalse((1==0),"test should pass")}).not.toThrow("test should pass");
        });

    });


});