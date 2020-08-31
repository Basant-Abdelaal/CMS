module.exports = {
    selectOption: function (status, options) {
        //console.log(options.fn(this));
        return options.fn(this).replace(new RegExp('value=' + status), '$& selected="selected"');
    }
}