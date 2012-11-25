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
Ext.define('CJ2H.store.TagStepStackedBar', {
	extend: 'Ext.data.JsonStore', 

	autoLoad: 'false',

	fields: [ { name: 'tag' }, { name: 'passed',  type: 'int' },
                         { name: 'skipped', type: 'int' }, 
                         { name: 'failed',  type: 'int' },  
			 { name: 'pending', type: 'int' }  ]
});