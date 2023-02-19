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

module.exports = {MatchesNumberPattern, ReverseString, ToNumber, Parser};