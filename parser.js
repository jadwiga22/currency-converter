
/**
 * Checks whether given string matches number pattern. Returns true, when
 * - s contains only digits
 * - or s contains only digits and one '.' (dot) - but the dot is neither the first, nor the last character in the string
 * 
 * and false otherwise.
 * @param {string} s 
 * @returns {boolean}
 */
function MatchesNumberPattern(s) {
    return (/^\d+$/.test(s) || /^\d+\.\d+$/.test(s));
}

/**
 * Reverses given string.
 * @param {string} s 
 * @returns {string}
 */
function ReverseString(s) {
    if( !s ) return "";
    return s.split("").reverse().join("");
}

/**
 * Calculates value of a string, assuming that it is a number given in a base. Multiplies final result by mult.
 * @param {string} s 
 * @param {number} base 
 * @param {number} mult 
 * @returns {number}
 */
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

/**
 * If given argument is not valid (i.e. is not a string or MatchesNumberPattern(s) === false), returns false. Otherwise calculates value of a number represented by a given string.
 * @param {string} s 
 * @returns {number | boolean}
 */

function Parser(s) {
    if( typeof s !== "string" || s === "" || !MatchesNumberPattern(s) ) {
        return false;
    }
    [s1, s2] = s.split('.');
    return ToNumber(s1,1,10)+ToNumber(ReverseString(s2), 1/10, 1/10);
}

module.exports = {MatchesNumberPattern, ReverseString, ToNumber, Parser};