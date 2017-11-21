var todoList = new Vue({
	el: '#todolist',
	data: {
		filterCriteria: 'Done',
		preview: '',
		listItems: [
			{
				onEdit: false,
				content: 'Fishing.',
				status: 'Done',
			},
			{
				onEdit: false,				
				content: 'Do homework.',
				status: 'Ongoing',
			},
			{
				onEdit: false,				
				content: 'Kill Dudi.',
				status: 'Ongoing',
			}			
		],
	},
	methods: {
		createList() {
			this.listItems.push({
				content: this.preview, 
				status: 'Ongoing',
			});
			this.preview = '';
		},
		deleteList(index) {
			this.listItems.splice(index, 1);
		},
		toggleListStatus: function(index) {
			if(this.listItems[index].status === 'Done') {
				this.listItems[index].status = 'Ongoing';
			} else {
				this.listItems[index].status = 'Done';
			}
		},		
		filterList(listItem) {
			if(this.filterCriteria === 'All') {
				return true;
			} else {
				return listItem.status === this.filterCriteria;				
			}
		},
		toggleListFilter(listStatus) {
			this.filterCriteria = listStatus;
		},
		editList(index) {
			this.listItems[index].onEdit = !this.listItems[index].onEdit;			
			if(this.listItems[index].onEdit) {
				this.$nextTick(function() {
					$('.list-edit')[index].focus();
				})
			}
		}
	},
});

