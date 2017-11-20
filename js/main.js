var addContent = Vue.extend({
	template: '<div>I am something.</div>',
});

var addConfirm = Vue.extend({

});

var listAdd = Vue.extend({
	template: '<div>Shit<add-content></add-content></div>',
	components: {
		'add-content': addContent,
		'add-confirm': addConfirm,
	},
});

var listFilter = {

};

var listItem = {

};

var todolist = new Vue({
	el: "#todolist",

	data: {
		listData: [
			{
				id: 0,
				content: 'Fishing!'
			}
		],
	},

	components: {
		'list-add': listAdd,
		'list-filter': {
			template: '<div>This is list filter.</div>'
		},

		'list-item': {
			template: '<div>These are list items</div>'
		}
	}
});