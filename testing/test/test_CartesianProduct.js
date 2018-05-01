const expect = require('chai').expect;

function arrEq(a, b) {
    expect(a.length).to.eq(b.length);
    for (let i = 0; i < a.length; i++) {
        expect(a[i]).to.eq(b[i]);
    }
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
        const c = new CartesianProduct([[42, 1234]]);
        c.next();
        c.next();
        expect(c.next()).to.not.be.ok;
        c.reset();
        arrEq(c.next(), [42]);
        arrEq(c.next(), [1234]);
    });
    it('works with 2 dimensions', () => {
        fail();
    });
});
