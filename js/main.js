(function() {

	var todolist = {
		filter: 'all',
		data: [
			{
				id: 0,
				done: false,
				content: 'This is default item.',
			},
			{
				id: 1,
				done: false,
				content: 'This is default item2.',
			},			
		],

		renderList: function() {
			// Wipe out the old data
			$('.todolist').empty();

			// Filter data before render
			var filteredList = todolist.filterList(todolist.data, todolist.filter);

			// render the list
			for(var i = 0; i < filteredList.length; i++) {
				$('.todolist')
					.append(
						$('<div/>')
							.addClass(function() {
								return filteredList[i].done ? 'list-item complete' : 'list-item'; 
							})
							.append(
								$('<span/>')
									.addClass('list-done')
									.text(filteredList[i].done)
									.on('click', {id: i}, e => {
										todolist.completeList(e.data.id);
									})
								,
								$('<span/>')
									.addClass('.list-content')
									.text(filteredList[i].content)
									.on('click', {id: i}, e => {
										todolist.editList(e.currentTarget,e.data.id);
									})
								,
								$('<span/>')
									.addClass('.list-delete')
									.text('Delete')
									.on('click', {id: i}, e => {
										todolist.deleteList(e.data.id);
									})
							)
					)			
			}
		},

		createList: function() {
			todolist.data.push(
				{
					id: todolist.data.length,
					done: false,
					content: $('.add-content').val()
				}
			);
			todolist.renderList();
		},

		deleteList: function(id) {
			todolist.data.splice(id, 1);
			todolist.renderList();
		},

		completeList: function(id) {
			todolist.data[id].done = !todolist.data[id].done;
			todolist.renderList();
		},

		editList: function(target, id) {
			$(target)
				.replaceWith(
					$('<input>')
						.val(todolist.data[id].content)
						.on('blur', {id: id}, e => {
							todolist.data[e.data.id].content = $(e.currentTarget).val();
							todolist.renderList();
						})
				)
		},

		filterList: function(datas, cond) {
			if(typeof cond === 'boolean') {
				return datas.filter(data => {
					return data.done === cond;
				})			
			} else {
				return datas;
			}
		},

		toggleFilter: function(cond) {
			todolist.filter = cond;
			todolist.renderList();
		}

	};

	todolist.renderList();

	// UI
	$('.add-confirm').on('click', todolist.createList);
	$('.all').on('click', () => todolist.toggleFilter('all'));
	$('.done').on('click', () => todolist.toggleFilter(true));
	$('.undone').on('click', () => todolist.toggleFilter(false));		

})();