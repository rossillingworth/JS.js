
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


    describe("OBJECT",function(){

        it("setProperty",function(){

            var o1 = {a:1};
            var o2 = JS.OBJECT.setProperty(o1,"b.c.d",2);
            expect(o1).toEqual({a:1,b:{c:{d:2}}});
            expect(o2).toEqual(2);


            var o3 = {a:1,b:{c:1}};
            var o4 = JS.OBJECT.setProperty(o3,"b",2);
            expect(o3).toEqual({a:1,b:2});
            expect(o4).toEqual(2);

            var o5 = {a:1,b:{c:1}};
            var o6 = JS.OBJECT.setProperty(o5,"b.c",{f:999,g:999},true);
            expect(o5).toEqual({a:1,b:{c:{f:999,g:999}}});
            expect(o6).toEqual({f:999,g:999});


            var o7 = {a:1,b:{c:{d:1}}};
            var o8 = JS.OBJECT.setProperty(o7,"b.c",{f:999,g:999},true);
            expect(o7).toEqual({a:1,b:{c:{d:1,f:999,g:999}}});
            expect(o8).toEqual({d:1,f:999,g:999});

        });

    });

});
