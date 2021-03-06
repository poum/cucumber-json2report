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
    linkStore.filter([{ property: 'scenario', value: this.get('id'), exactMatch: true }]);
    var tagIds = linkStore.collect('tag');
    linkStore.clearFilter();

    return tagIds;
  },

  getTags: function() {
    var tags = new Array();
    var tagStore = Ext.getStore('Tags');
    Ext.Array.forEach(this.getTagIds(), function(tagId) {
      tags.push(tagStore.findRecord('id', tagId, 0, false, true, true));
    });

    return tags;
  },

  getListing: function() {
    var comments = Ext.getStore('Comments');
    comments.filter([{ property: 'scenario', value: this.get('id'), exactMatch: true }]);
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
    steps.filter([{ property: 'scenario', value: this.get('id'), exactMatch: true }]);
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
      '<tpl if="duration && duration !== 0"><span class="duration">{[ values.duration.toFixed(2) ]}&nbsp;ms</span></tpl>',
      '</p>',
      '<p><span class="description">{description}</span></p>',
      '<ul class="steps">'+ stepListing + '</ul>',
      '</li>'
    );

    return tpl.apply(this.getData());
  },

  attach: function(parentNode) {

    var scenarioNode = {
      iconCls:  'window_' + this.get('status'),
      expanded: true,
      leaf:     false
    };

    scenarioNode = parentNode.appendChild(scenarioNode);
    scenarioNode.set('text', this.get('name'));
    scenarioNode.set('duration', this.get('duration'));
    scenarioNode.set('status', this.get('status'));


    var steps = Ext.getStore('Steps');
    steps.filter([{ property: 'scenario', value: this.get('id'), exactMatch: true }]);
    var children = [];
    steps.each(function(step) {
     step.attach(scenarioNode);
    });
    steps.clearFilter();
  }
});
