module.exports.check = function (e) {
    var m = ""
    for (var i = 0;i < e.length;i++) {
        m += e.charCodeAt(i).toString()
    }
    m ^= e
    return Math.abs(m);
}
