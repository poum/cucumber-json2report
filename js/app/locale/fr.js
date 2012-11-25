/**
French message

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
Ext.define('CJ2H.locale.fr', {
	extend: 'CJ2H.locale.default',

		loadingData: 'Chargement des données ...',
		pageTitlePrefix: 'Rapport HTML Cucumber',
		FeaturesPageTitle: 'Vue d\'ensemble des fonctionnalités',
		FeaturesNamedPageTitle: 'Résultat',
		TagsPageTitle: 'Vue d\'ensemble des étiquettes',
		forFeaturesNamed: 'de la fonctionnalité',
		build: 'build n°',
		forBuild: 'pour le build n°',
		FeaturesStatistics: 'Statistiques sur les fonctionnalités',
		FeaturesNamedStatistics: 'Statistiques',
		TagsStatistics: 'Statistiques sur les étiquettes',
		feature: 'fonctionnalité',
		features: 'fonctionnalités',
		featureList: 'liste des fonctionnalités',
		featureListingTitle: 'Détails de la fonctionnalité',
		asA: /en tant qu('|e)/,
		iWant: /je veux/,
		toThat: /(afin|de telle sorte) (d|qu)('|e)/,
		allFeaturesDesc: 'réafficher toutes les fonctionnalités',
		name: 'nom',
		description: 'description',
		scenarioNumber: 'scénarios',
		scenario: 'scénario',
		scenarios: 'scénarios',
		scenarioPassed: 'réussi',
		scenarioFailed: 'en échec',
		scenarioSkipped: 'sauté',
		scenarioPending: 'à implémenter',
		stepPassed: 'réussie',
		stepFailed: 'en échec',
		stepSkipped: 'sautée',
		stepPending: 'à implémenter',
		featurePassed: 'réussie',
		featureFailed: 'en échec',
		featureSkipped: 'sautée',
		featurePending: 'à implémenter',
		stepNumber: 'étapes',
		step: 'étape',
		steps: 'étapes',
		tag: 'étiquette',
		tags: 'étiquettes',
		tagPassed: 'réussies',
		tagFailed: 'en échec',
		tagSkipped: 'sautées',
		tagPending: 'à implémenter',
		passedNumber: 'réussies',
		passed: 'réussie',
		passeds: 'réussies',
		failedNumber: 'en échec',
		failed: 'en échec',
		faileds: 'en échec',
		skippedNumber: 'sautées',
		skipped: 'sautée',
		skippeds: 'sautées',
		pendingNumber: 'à implémenter',
		pending: 'à implémenter',
		pendings: 'à implémenter',
		duration: 'durée',
		ms: 'ms',
		featuresCharts: 'graphiques étapes / scénarios',
		tagsStackedBarChart: 'Graphique d\'état des étapes des étiquettes',
		numberOfStepByStatus: 'Nombre d\'étapes par état',
		saveChartsDesc: 'Enregistrer l\'un de ces graphiques au format PNG<br>Un accès à Internet est nécessaire.',
		saveChartsWindowTitle: 'Quel graphique enregistrer ?',
		saveChartsWindowMsg: 'Merci de choisir le graphique à enregistrer :',
});
