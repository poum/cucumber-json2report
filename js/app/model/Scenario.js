Ext.define('CJ2H.model.Scenario', {
    extend: 'CJ2H.model.Model',
    fields: [
        { name: 'id' },
	{ name: 'keyword', type: 'string' },
	{ name: 'feature' },
	{ name: 'name', type: 'string' },
	{ name: 'description', type: 'string',
	  convert: function(v, record) {
		return v.replace(/\n/g, '<br>');
	  }
	},
	{ name: 'tags', type: 'int' },
	{ name: 'stepNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepSkippedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPendingNumber', type: 'int', defaultValue: 0 },
	{ name: 'duration', type: 'float', defaultValue: 0 },
	{ name: 'status', type: 'string', defaultValue: 'passed' },
    ],

    getTagIds: function() {
	var linkStore = Ext.getStore('TagFeatureScenarioLinks');
	linkStore.filter('scenario', this.get('id'));
	var tagIds = linkStore.collect('tag');
	linkStore.clearFilter();

	return tagIds;
    },

    getTags: function() {
	var tags = new Array();
	var tagStore = Ext.getStore('Tags');
	Ext.Array.forEach(this.getTagIds(), function(tagId) {
		tags.push(tagStore.findRecord('id', tagId));
	});

	return tags;
    },

    getListing: function() {

	var comments = Ext.getStore('Comments');
	comments.filter('scenario', this.get('id'));
	var commentListing = '';
	comments.each(function(comment) {
		commentListing += comment.getListing();
	});
	comments.clearFilter();

	var tags = this.getTags();
	var tagListing = '';
	Ext.Array.forEach(tags, function(tag) {
		tagListing += tag.getListing();
	});

	var steps = Ext.getStore('Steps');
	steps.filter('scenario', this.get('id'));
	var stepListing = '';
	steps.each(function(step) {
		stepListing += step.getListing();
	});
	steps.clearFilter();

	var tpl = new Ext.XTemplate(
			'<li class="row_{status}">',
				'<ul class="comments">' + commentListing + '</ul>',
				'<ul class="tags">' + tagListing + '</ul>',
				'<p>',
					'<span class="keyword scenario_{status}">{keyword}</span>', 
					'<span class="name">{name}</span>',
					'<tpl if="duration && duration != 0"><span class="duration">{[ values.duration.toFixed(2) ]}&nbsp;ms</span></tpl>',
				'</p>',
				'<p><span class="description">{description}</span></p>',
				'<ul class="steps">'+ stepListing + '</ul>',
			'</li>'
	);

	return tpl.apply(this.getData());
    }
});
