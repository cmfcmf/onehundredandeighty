const expect = require('chai').expect;

function arrEq(a, b) {
    const toStr = (arr) => JSON.stringify(arr);//`[${arr}]`;
    expect(toStr(a)).to.eq(toStr(b));
    expect(a.length).to.eq(b.length);
}

describe('CartesianProduct.js', () => {
    const CartesianProduct = require('../../js/CartesianProduct');
    it('works with one dimension', () => {
        const c = new CartesianProduct([[1, 2, 3, 4]]);
        expect(c.dimensions()).to.eq(1);
        expect(c.totalAmount()).to.eq(4);
        arrEq(c.next(), [1]);
        arrEq(c.next(), [2]);
        arrEq(c.next(), [3]);
        arrEq(c.next(), [4]);
        expect(c.next()).to.not.be.ok;
        expect(c.next()).to.not.be.ok;
    });
    it('is resettable', () => {
        const c = new CartesianProduct([[42, 1234], [17]]);
        c.next();
        c.next();
        expect(c.next()).to.not.be.ok;
        c.reset();
        arrEq(c.next(), [42, 17]);
        arrEq(c.next(), [1234, 17]);
    });
    it('works with 2 dimensions', () => {
        const c = new CartesianProduct([['a', 'b'], ['x', 'y']]);
        expect(c.dimensions()).to.eq(2);
        expect(c.totalAmount()).to.eq(4);
        arrEq(c.next(), ['a', 'x']);
        arrEq(c.next(), ['a', 'y']);
        arrEq(c.next(), ['b', 'x']);
        arrEq(c.next(), ['b', 'y']);
        expect(c.next()).to.not.be.ok;
    });
    it('works with 3 dimensions', () => {
        const c = new CartesianProduct([['a', 'b'], ['x', 'y'], [12, 13]]);
        expect(c.dimensions()).to.eq(3);
        expect(c.totalAmount()).to.eq(8);
        arrEq(c.next(), ['a', 'x', 12]);
        arrEq(c.next(), ['a', 'x', 13]);
        arrEq(c.next(), ['a', 'y', 12]);
        arrEq(c.next(), ['a', 'y', 13]);
        arrEq(c.next(), ['b', 'x', 12]);
        arrEq(c.next(), ['b', 'x', 13]);
        arrEq(c.next(), ['b', 'y', 12]);
        arrEq(c.next(), ['b', 'y', 13]);
        expect(c.next()).to.not.be.ok;
    });
    it('works on exotic data types', () => {
        const c = new CartesianProduct([['a', [456]], [{foo: 7}, function(){}]]);
        expect(c.dimensions()).to.eq(2);
        expect(c.totalAmount()).to.eq(4);
        arrEq(c.next(), ['a', {foo: 7}]);
        arrEq(c.next(), ['a', function(){}]);
        arrEq(c.next(), [[456], {foo: 7}]);
        arrEq(c.next(), [[456], function(){}]);
        expect(c.next()).to.not.be.ok;
    });
    it('works on no dimensions', () => {
        const c = new CartesianProduct([]);
        expect(c.dimensions()).to.eq(0);
        expect(c.totalAmount()).to.eq(0);
        expect(c.next()).to.not.be.ok;
    });
});
