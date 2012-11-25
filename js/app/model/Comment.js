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
Ext.define('CJ2H.model.Comment', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'id' },
	{ name: 'text', type: 'string',
		convert: function(v, record) {
			return v.replace(/^\#/, '');
		}
        },
	{ name: 'feature', defaultValue: null },
	{ name: 'scenario', defaultValue: null },
	{ name: 'step', defaultValue: null },
    ],

    getListing: function() {
	return Ext.String.format('<li>{0}</li>', this.get('text'));
    }
});
