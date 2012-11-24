Ext.define('CJ2H.model.Feature', {
    extend: 'CJ2H.model.Model',
    fields: [
        { name: 'id' },
	{ name: 'description', type: 'string',
	  convert: function(v, record) {
		return v.replace(/\n/g, '<br>');
	  }
	},
	{ name: 'name', type: 'string' },
	{ name: 'keyword', type: 'string' },
	{ name: 'uri' },
	{ name: 'scenarioNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'scenarioFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPassedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepFailedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepSkippedNumber', type: 'int', defaultValue: 0 },
	{ name: 'stepPendingNumber', type: 'int', defaultValue: 0  },
	{ name: 'duration', type: 'float', defaultValue: 0 },
	{ name: 'status', type: 'string', defaultValue: 'passed' },
	{ name: 'language', type: 'string', defaultValue: 'en' }
    ],

    getTagIds: function() {
	var linkStore = Ext.getStore('TagFeatureScenarioLinks');
	linkStore.filter('feature', this.get('id'));
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

    printListing: function(msg) {

	var comments = Ext.getStore('Comments');
	comments.filter('feature', this.get('id'));
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

	var scenarios = Ext.getStore('Scenarios');
	scenarios.filter("feature", this.get('id'));
	var elementListing = '';
	scenarios.each(function(scenario) {
		elementListing += scenario.getListing();
	});
	scenarios.clearFilter();

	var tpl = new Ext.XTemplate(
		'<h2 id="listingTitle">' + msg.featureListingTitle + ' "{name}"</h2>',
		'<div id="feature" class="row_{status}">',
			'<ul class="comments">' + commentListing + '</ul>',
			'<ul id="tags">' + tagListing + '</ul>',
			'<p id="featureTitle">',
				'<span id="featureKeyword" class="feature_{status}">{keyword}:</span>&nbsp;',
				'<span id="featureName">{name}</span>',
				'<tpl if="duration && duration != 0"><span class="duration">{[ values.duration.toFixed(2) ]}&nbsp;ms</span></tpl>',
			'</p>',
			'<div class="description">{description}</div>',
			'<ul id="elements">' + elementListing + '</ul>',
		'</div>'
        );

	tpl.overwrite(Ext.fly('listing'), this.getData());

	Ext.Array.forEach(Ext.query('span[class=embeddings]'), function(button) {
		if (button.innerHTML) {
			number = button.innerHTML;
			button.innerHTML = '';
			Ext.create('Ext.Button', {
				text: number, 
				tooltip: number,
				iconCls: 'viewEmbeddingBtn',
				action: 'viewEmbedding',
				data: button.getAttribute('data'),
				height: 16,
				renderTo: button
			});	
		}
	});
    }
/*
    associations: [
	{ type: 'hasMany', model: 'CJ2H.model.Tag', getterName: 'getTags' },
	{ type: 'hasMany', model: 'CJ2H.model.Scenario', getterName: 'getScenarii' },
	{ type: 'hasMany', model: 'CJ2H.model.Comment', getterName: 'getComments' }
    ],
    validations: [
    ],

  */ 
});
