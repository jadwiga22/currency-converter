function MatchesNumberPattern(s) {
    return (/^\d+$/.test(s) || /^\d+\.\d+$/.test(s));
}

function ReverseString(s) {
    if( !s ) return "";
    return s.split("").reverse().join("");
}

function ToNumber(s, base, mult){
    if( s === "" ) return 0;

    const zero = "0";
    var res = 0;
    for( var i = 0; i < s.length; i++ ) {
        res *= mult;
        var digit = s.charCodeAt(i) - "0".charCodeAt(0);
        res += (digit);
    }
    return res*base;
}

function Parser(s) {
    if( typeof s !== "string" || s === "" || !MatchesNumberPattern(s) ) {
        return false;
    }
    [s1, s2] = s.split('.');
    return ToNumber(s1,1,10)+ToNumber(ReverseString(s2), 1/10, 1/10);
}

console.log(MatchesNumberPattern("38748.23") === true );
console.log(MatchesNumberPattern("76347s.3874") === false);
console.log(MatchesNumberPattern("") === false);
console.log(MatchesNumberPattern("893748") === true);
console.log(MatchesNumberPattern(".398478") === false);
console.log(MatchesNumberPattern("23648.234a") === false);
console.log(MatchesNumberPattern("3879.") === false);
console.log(MatchesNumberPattern("384947.39478.323") === false);

console.log("----------------------------------")
console.log(ToNumber("237483", 1, 10) === 237483);
console.log(ToNumber("00238743", 1, 10) === 238743);

console.log("----------------------------------")
console.log(Parser("237483") === 237483);
console.log(Parser("00238743") === 238743);
console.log(Parser("3894.34786") === 3894.34786);
console.log(Parser("0.329743") === 0.329743);

module.exports = {Parser};