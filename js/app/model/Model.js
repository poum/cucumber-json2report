/*
Copyright 2012 Philippe Poumaroux

This file is part of cucumber-json2report.

cucumber-json2report is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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
