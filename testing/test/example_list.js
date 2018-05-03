module.exports = function(addExample) {

    addExample('Empty', [], false);

    // to generate such a string from your current 180 configuration
    // result = ''; for (const p in data) { if(f.getSemester(p) >= 0) { result += p + ','; } } result
    function addStringExample(name, belegungsString, isValid = true) {
        addExample(name, belegungsString.split(','), isValid);
    }

    addStringExample('Eriks Belegung', 'bs,bva,cg1,cg2,dbs1,dschoolfirsttrack,englischlevel2,gds,grafikprogramming,hci2,mathematik1,mathematik2,mod1,mod2,pem,pt1,pt2,recht1,recht2,swa,swt1,swt2,ti1,ti2,ueberzeugendpraesentieren,wirtschaft,www')

};