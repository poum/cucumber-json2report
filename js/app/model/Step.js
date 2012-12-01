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
Ext.define('CJ2H.model.Step', {
    extend: 'CJ2H.model.Model',
    fields: [
        { name: 'id' },
	{ name: 'keyword', type: 'string' },
	{ name: 'name', type: 'string' },
	{ name: 'scenario' },
	{ name: 'status', type: 'string', defaultValue: 'passed' },
	{ name: 'duration', type: 'float', defaultValue: 0 },
	{ name: 'error_message', type: 'string', defaultValue: '',
	  convert: function(v, record) {
		return v.replace(/\n/g, '<br>');
	  }
	}
    ],

    getListing: function() {
	var comments = Ext.getStore('Comments');
	comments.filter([{ property: 'step', value: this.get('id'), exactMatch: true}]);
	var commentListing = '';
	comments.each(function(comment) {
		commentListing += comment.getListing();
	});
	comments.clearFilter();

	var embeddings = Ext.getStore('Embeddings');
	embeddings.filter([{ property: 'step', value: this.get('id'), exactMatch: true }]);
	var embeddingListing = '';
	var embeddingNumber = embeddings.count() || '';
	embeddings.clearFilter();

	var tpl = new Ext.XTemplate(
		'<li class="row_{status}">',
			'<ul class="comments">' + commentListing + '</ul>',
			'<p>',
				'<span class="keyword stepKeyword step_{status}">{keyword}</span>',
				'<span class="name">{name}</span>',
				'<tpl if="duration && duration !== 0"><span class="duration stepDuration">{[ values.duration.toFixed(2) ]}&nbsp;ms</span></tpl>',
				'<span class="embeddings" data="{id}">', embeddingNumber, '</span>',
			'</p>',
			'<tpl if="error_message"><div class="error_message"><pre>{error_message}</pre></div></tpl>',		
		'</li>'
	);

	return tpl.apply(this.getData());
    }
});
