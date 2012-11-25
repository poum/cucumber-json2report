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
Ext.define('CJ2H.model.Tag', {
    extend: 'CJ2H.model.Model',
    fields: [
	{ name: 'id' },
	{ name: 'name', type: 'string' },
	{ name: 'featureNumber', type: 'int', defaultValue: 0 },
	{ name: 'featurePassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'featureFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepSkippedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPendingNumber', type: 'int', defaultValue: 0 },
	{ name: 'duration', type: 'float', defaultValue: 0},
	{ name: 'status', type: 'string', defaultValue: 'passed' }
    ],

    getListing: function() {
	return Ext.String.format('<li>{0}</li>', this.get('name'));
    }
});
