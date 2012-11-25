Ext.define('CJ2H.model.Model', {
    extend: 'Ext.data.Model',

    inc: function(field) {
	this._assertNumber(field) && this.add(field, 1);
    },

    dec: function(field) {
	this._assertNumber(field) && this.add(field, -1);
    },

    add: function(field, value) {
	this.set(field, this.get(field) + value);
    },

    _assertNumber: function(field) {
	if ('number' !== typeof this.get(field)) {
		throw { error: 'NaNError', message: field + ' or ' + field + 'value is not a number' };
	}

	return true;
    }
});
