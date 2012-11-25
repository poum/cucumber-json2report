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
	comments.filter('step', this.get('id'));
	var commentListing = '';
	comments.each(function(comment) {
		commentListing += comment.getListing();
	});
	comments.clearFilter();

	var embeddings = Ext.getStore('Embeddings');
	embeddings.filter('step', this.get('id'));
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
