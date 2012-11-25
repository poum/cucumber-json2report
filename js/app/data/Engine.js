Ext.require('CJ2H.store.JsonFeatures');
Ext.require('CJ2H.store.Features');
Ext.require('CJ2H.store.Scenarios');
Ext.require('CJ2H.store.Steps');
Ext.require('CJ2H.store.Tags');
Ext.require('CJ2H.store.TagFeatureScenarioLinks');
Ext.require('CJ2H.store.ScenarioPie');
Ext.require('CJ2H.store.StepPie');
Ext.require('CJ2H.store.Tags');
Ext.require('CJ2H.store.Comments');
Ext.require('CJ2H.store.Embeddings');

Ext.define('CJ2H.data.Engine', {

	config: {
		src: 'data/cucumber.json',
		app: null,
		msg: null,
		page: null,
		data: [],
	},

	constructor: function(config) {
		var initData = { app: config.app, msg: config.page.getMsg(), page: config.page };
		if (config.page.src) {
			initData.src = config.page.getSrc();
		}

		this.initConfig(initData);
		this.load();
	},

	load: function() {
		Ext.getBody().mask(this.msg.loadingData);
		var src = this.getSrc();
		if (! Ext.fly('data')) {
			Ext.DomHelper.append(Ext.getBody(), { tag: 'iframe', id: 'data', src: src, style: 'display: none;' });
		}
		console.debug('TODO: intercept not found frame content here ....');
		Ext.get('data').on('load', this.getData, this);
	},

        getData: function() {
		var cucumberDataStr = null;
		var iframe = Ext.getDom('data');
		console.debug("TODO: utiliser isIE pour la ligne suivante ...");
		cucumberDataStr = iframe.contentDocument || iframe.contentWindow;
		cucumberDataStr = cucumberDataStr.body.outerHTML;
		var re = /<body><pre>([\s\S]*)<\/pre><\/body>/i;
		var result = re.exec(cucumberDataStr);
		if (! result[1]) {
			alert('no data loaded in ' + this.getSrc() + '\ngot: ' + result[1]);
			throw { error: 'DataError', message: 'no data loaded in ' + this.getSrc() + '\ngot: ' + result[1] };
		}
		try {
			this.setData(Ext.JSON.decode(result[1]));
		}
		catch (e) {
			alert('unable to decode ' + this.getSrc() + ': ' + e.message);
			throw { error: 'DataError', message: 'unable to decode ' + this.getSrc() + ': ' + e.message };
		}

		var jsonFeaturesStore = this.app.getStore('JsonFeatures');
		jsonFeaturesStore.addListener('datachanged', this.postLoading, this);
		jsonFeaturesStore.loadData(this.data);
	},

	postLoading: function(jsonFeaturesStore) {

			var feature;
			var scenario;
			var step;
			var tag;
			var idFeature = 1;
			var idScenario = 1;
			var idStep = 1;
			var idComment = 1;
			var idTag = 1;
			var idEmbedding = 1;

			var tags;

			var result;

			Ext.Array.forEach(['Features', 'Scenarios', 'Steps', 'StepPie', 'ScenarioPie', 'Tags', 'TagFeatureScenarioLinks', 'Comments', 'Embeddings'], function(store) { 
				this.app.getStore(store).removeAll(); 
			}, this);

			jsonFeaturesStore.each(function(jsonFeature) {

				feature = Ext.create('CJ2H.model.Feature', { 
					id:          idFeature++,
					name:        jsonFeature.get('name'),
					keyword:     jsonFeature.get('keyword'),
					description: jsonFeature.get('description'),
					uri:         jsonFeature.get('uri'),
				});

				// unsupported forEach here !
				Ext.Array.each(jsonFeature.get('tags'), function(jsonTag) {
					idTag = this.recordTag(jsonTag.name, idTag, feature);
				}, this);

				// unsupported forEach here !
				Ext.Array.each(jsonFeature.get('comments'), function(jsonComment) {
					idComment = this.recordComment(jsonComment.value, idComment, feature);
					// catch lang in #language: xx comments
					if (jsonComment.value) {
						var found = jsonComment.value.match(/^#\s*language:\s*(\w+)/);
						if (found) {
							feature.set('language', found[1]);
						}
					}
				}, this);

				Ext.Array.forEach(jsonFeature.get('elements'), function(jsonElement) {
			
					if ("scenario" === jsonElement.type || "background" === jsonElement.type)	{

						scenario = Ext.create('CJ2H.model.Scenario', {
							id:          idScenario++,
							name:        jsonElement.name,
							keyword:     jsonElement.keyword,
							description: jsonElement.description,
							tags:        jsonElement.tags,
							feature:     feature.getId()
						});

						if (jsonElement.comments) {
							Ext.Array.forEach(jsonElement.comments, function(jsonComment) {
								idComment = this.recordComment(jsonComment.value, idComment, scenario);
							}, this);
						}

						if (jsonElement.tags) {
							Ext.Array.forEach(jsonElement.tags, function(jsonTag) {
								idTag = this.recordTag(jsonTag.name, idTag, scenario);
							}, this);
						}

						Ext.Array.forEach(jsonElement.steps, function(jsonStep) {
							if (jsonStep.result) {
								
								result = jsonStep.result;

								step = Ext.create('CJ2H.model.Step', {
									id:            idStep++,
									name:          jsonStep.name,
									keyword:       jsonStep.keyword,
									scenario:      scenario.getId(),
									status:        result.status,
									duration:      result.duration / 1000000,
									error_message: result.error_message
								});

								Ext.getStore('Steps').add(step);

								if (jsonStep.comments) {
									Ext.Array.forEach(jsonStep.comments, function(jsonComment) {
										idComment = this.recordComment(jsonComment.value, idComment, step);
									}, this);
								}

								if (jsonStep.embeddings) {
									Ext.Array.forEach(jsonStep.embeddings, function(jsonEmbedding) {
										idEmbedding = this.recordEmbedding(jsonEmbedding, idEmbedding, step);
									}, this);
								}

								if ("passed" === step.get('status')) {
									scenario.inc('stepPassedNumber');
								}
								else {
									scenario.set('status', 'failed');
									if ("failed" === step.get('status')) {
										scenario.inc('stepFailedNumber'); 
									}
									else if ("skipped" === step.get('status')) {
										scenario.inc('stepSkippedNumber'); 
									}
									else if ("pending" === step.get('status')) {
										scenario.inc('stepPendingNumber');
									}
								};
								// some step (skipped, pending) did'nt have any duration
								if (step.get('duration')) {
									scenario.add('duration', step.get('duration'));
								}
								scenario.inc('stepNumber'); 
							}	
							else {
								console.debug('Step without results');
								console.debug(jsonStep);
								throw { name: 'StepError', message: 'Step without results', step: jsonStep };
							}

						}, this);

						Ext.getStore('Scenarios').add(scenario);

						feature.inc('scenarioNumber');
						
						if ("passed" === scenario.get('status')) {
							feature.inc('scenarioPassedNumber'); 
						}
						else {
							feature.set('status',"failed");
							feature.inc('scenarioFailedNumber'); 
						}

						// merge feature and scenario tags
						// merge does'nt seem to work .... :-(
						tags = feature.getTags();
						Ext.Array.forEach(scenario.getTags(), function(tag) {
							if (! Ext.Array.contains(tags, tag)) {
								Ext.Array.push(tags, tag);
							}
						});

						Ext.Array.forEach(tags, function(tag) {
							tag.inc('scenarioNumber');
							if ("passed" === scenario.get('status')) {
								tag.inc('scenarioPassedNumber');
							}
							else {
								tag.set('status', 'failed');
								tag.inc('scenarioFailedNumber');
							}
						});

						Ext.Array.forEach(['stepNumber', 'stepPassedNumber', 'stepFailedNumber', 'stepSkippedNumber', 'stepPendingNumber', 'duration'],
   							function(field) {
								feature.add(field, scenario.get(field));
								Ext.Array.forEach(tags, function(tag) {
									tag.add(field, scenario.get(field));
								});	
							}
						);
					}
					else {
						console.debug('Unknown element type: ' + jsonElement.type);
						console.debug(jsonElement);
						throw { name: 'ScenarioError', message: 'Unknown element type: ' + jsonElement.type, element: jsonElement }
					}
				}, this);

				this.app.getStore('Features').add(feature);

				Ext.Array.forEach(feature.getTags(), function(tag) {
					tag.inc('featureNumber');
					if ("passed" === feature.get('status')) {
						tag.inc('featurePassedNumber');
					}
					else {
						tag.set('status', 'failed');
						tag.inc('featureFailedNumber');
					}
				});
		}, this);

		if (this.page.menu === 'Features') {
			this.app.getController('Features').loadPies();
			// hack to have grid summmary refreshed in order to display correct information
			this.app.getController('Features').refreshGridSummary();
		}

		Ext.get('data').remove();
		Ext.getBody().unmask();
	},

	recordTag: function(tagName, currentIdTag, parentNode) {

		//getting ride of empty array
		if (tagName) {
			// the tag should already exists
			tag = Ext.getStore('Tags').findRecord('name', tagName, 0, false, true, true);
			if (! tag) {
				tag = Ext.create('CJ2H.model.Tag', {
					id:            currentIdTag++,
					name:          tagName
				});

				Ext.getStore('Tags').add(tag);
			}

			var config = { tag: tag.get('id') };
			// config.scenario or config.feature, using parent model name
			config[parentNode.self.getName().replace(/.*\./, '').toLowerCase()] = parentNode.get('id');

			var tagFeatureLink = Ext.create('CJ2H.model.TagFeatureScenarioLink', config);

			Ext.getStore('TagFeatureScenarioLinks').add(tagFeatureLink);
		}

		// incremented if a new tag has been created 
		return currentIdTag;
	},

	recordComment: function(comment, currentIdComment, parentNode) {
		if (comment) {
			var config = { text: comment, id: currentIdComment++ };
			// config.scenario, config.feature or config.step, using parent model name
			config[parentNode.self.getName().replace(/.*\./, '').toLowerCase()] = parentNode.get('id');

			var commentRecord = Ext.create('CJ2H.model.Comment', config);

			Ext.getStore('Comments').add(commentRecord);			
		}

		return currentIdComment;
	},

	recordEmbedding: function(embedding, currentIdEmbedding, step) {
		if (embedding && embedding.data) {
		
			var embeddingRecord = Ext.create('CJ2H.model.Embedding', { 
				id:        currentIdEmbedding++,
				step:      step.get('id'),
				mime_type: embedding.mime_type,
				data:      embedding.data
			});

			Ext.getStore('Embeddings').add(embeddingRecord);			
		}

		return currentIdEmbedding;
	}
});

