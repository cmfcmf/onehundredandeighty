const path = require('path');
const expect = require('chai').expect;
const wdio = require('wdio');
const process = require('process');


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


describe('examples', function() {
    this.timeout(60000);

    const browser = wdio.getBrowser({
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: ['headless', 'disable-gpu', 'no-sandbox']
            },
        }
    });
    let seleniumProcess = undefined;

    before(function(done) {
        wdio.initSelenium(function(err, process) {
            seleniumProcess = process;
            done(err, process);
        });
    });

    before(wdio.wrap(function() {
        browser.init();
        browser.url(getFileUrl("../index.html") + "?flavour=hpi-ba-2016");
    }));

    after(wdio.wrap(function() {
        browser.end();
        if (seleniumProcess !== undefined) {
            process.kill(seleniumProcess.pid);
        }
    }));

    it('Should return "onehundredandeighty" when asked about the page title', wdio.wrap(function () {
        expect(browser.getTitle()).to.eq('onehundredandeighty');
    }));


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
        it(`Belegung "${example.name}" should${example.isValid ? '' : ' not'} be valid`, wdio.wrap(function() {
            const belegungen = example.belegungen;

            /*const title = browser.execute(function() {
                return document.title;
            });
            console.log("title: " + JSON.stringify(title));/**/

            /*const valid = browser.execute(function(belegungen) {
                localStorage.clear();
                return window.data.length > 50;
                //TODO move all courses back to the pool
                for (const belegung of belegungen) {
                    window.Semester.get(0).take(belegung);
                }
                const failingRules = window.ruleManager.checkAll();
                return failingRules.length === 0;
            }, belegungen);
            expect(valid).to.eq(example.isValid);/**/

        }));
    }
});
