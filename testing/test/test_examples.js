const expect = require('chai').expect;

describe('examples', () => {

    const examples = [];
    function addExample(name, belegungen, isValid = true) {
        examples.push({
            name: name,
            belegungen: belegungen,
            isValid: isValid
        });
    }
    require('./example_list.js')(addExample);

    for(let i = 0; i < examples.length; i++) {
        const example = examples[i];
        it(`Belegung "${example.name}" should${example.isValid ? '' : ' not'} be valid`,  () => {
            const belegungen = example.belegungen;

            expect('Not implemenet yet!').to.be.not.ok;


        });
    }
});
