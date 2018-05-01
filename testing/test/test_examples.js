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

            //TODO karma here!
            localStorage.clear();
            //TODO move all courses back to the pool
            for (const belegung of belegungen) {
                Semester.get(0).take(belegung);
            }

            const failingRules = ruleManager.checkAll();
            const valid = failingRules.length === 0;
            expect(valid).to.eq(example.isValid);


            expect('Not implemenet yet!').to.be.not.ok;


        });
    }
});
