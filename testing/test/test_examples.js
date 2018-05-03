const path = require('path');
const expect = require('chai').expect;
const wdio = require('wdio');


function getFileUrl(str) {
    let pathName = path.resolve(str).replace(/\\/g, '/');
    // Windows drive letter must be prefixed with a slash
    if (pathName[0] !== "/") {
        pathName = "/" + pathName;
    }
    return encodeURI("file://" + pathName);
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


describe('examples', () => {

    describe('wdio test', function() {
        this.timeout(60000);
        const browser = wdio.getBrowser({
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['headless', 'disable-gpu']
                },
            }
        });

        before(wdio.initSelenium);

        before(wdio.wrap(function() {
            browser.init();
            browser.url(getFileUrl("../index.html"));
        }));

        after(wdio.wrap(function() {
            browser.end();
        }));

        it('Should return "onehundredandeighty" when asked about page title', wdio.wrap(function () {
            expect(browser.getTitle()).to.eq('onehundredandeighty');
        }));
    })


    const examples = [];
    function addExample(name, belegungen, isValid = true) {
        examples.push({
            name: name,
            belegungen: belegungen,
            isValid: isValid
        });
    }
    require('./example_list.js')(addExample);

    for(let i = 0; i < 0/*examples.length*/; i++) {
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
