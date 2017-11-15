(function() {

	var todolist = {
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
			$('.todolist').empty();
			for(var i = 0; i < todolist.data.length; i++) {
				$('.todolist')
					.append(
						$('<div/>')
							.addClass(function() {
								return todolist.data[i].done ? 'list-item complete' : 'list-item'; 
							})
							.append(
								$('<span/>')
									.addClass('list-done')
									.text(todolist.data[i].done)
									.on('click', {id: i}, e => {
										todolist.completeList(e.data.id);
									})
								,
								$('<span/>')
									.addClass('.list-content')
									.text(todolist.data[i].content)
									.on('click', e => {
										$(e.currentTarget)
											.replaceWith(
												$('<input>')
													.val($(e.currentTarget).text());
											)
											
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

		editList: function(id) {

		}

	};

	todolist.renderList();

	// UI
	$('.add-confirm').on('click', todolist.createList);

})();