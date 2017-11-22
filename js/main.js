var todoList = new Vue({
	el: '#todolist',
	data: {
		filterCriteria: 'All',
		filterClass: {
			allIsActive: true,
			doneIsActive: false,
			ongoingIsActive: false,
		},
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
			for(var prop in this.filterClass) {
				this.filterClass[prop] = false;
			}
			switch(listStatus) {
				case 'Ongoing':
					this.filterClass.ongoingIsActive = true;
					break;
				case 'Done':
					this.filterClass.doneIsActive = true;
					break;
				default:
					this.filterClass.allIsActive = true;
					break;
			}
		},
		editList(index) {
			this.listItems[index].onEdit = !this.listItems[index].onEdit;			
			if(this.listItems[index].onEdit) {
				this.$nextTick(function() {
					$('.list-edit')[index].focus();
				})
			}
		},
		blur(e) {
			e.target.blur();
		}
	},
});

