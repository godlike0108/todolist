(function() {

	var filterType = 'all';
	var itemData = [
		{
			done: true,
			content: 'This is for test',
		}
	];

	renderList();

	$('.add-confirm').on('click', () => {
		createList();
	});

	$('.all').on('click', () => {
		filterType = 'all';
		renderList();
	});

	$('.done').on('click', () => {
		filterType = true;
		renderList();
	});

	$('.undone').on('click', () => {
		filterType = false;
		renderList();
	});		

	// render item data array with tags
	function renderList() {

		// delete all child
		$('.todolist').empty();

		// filter before render
		var filterItemData = filterList(filterType);



		// render all items out
		for(var i = 0; i < filterItemData.length; i++) {
			$('<div/>')
				.addClass(() => {
					if(filterItemData[i].done) {
						return 'list-item complete';
					} else {
						return 'list-item';
					}
				})
				.append(
					$('<span/>')
						.addClass('list-done')
						.text(function() {
							if(filterItemData[i].done) {
								return 'Done';
							} else {
								return 'Ongoing';
							}
						})
						.on('click', e => {
							completeList($(e.currentTarget).closest('.list-item'));
						}),
					$('<span/>')
						.addClass('list-content')
						.text(filterItemData[i].content)
						.on('click', filterItemData[i], e => {
							editList(e);
						}),
					$('<a/>')
						.attr('href','#')
						.addClass('list-delete')
						.text('Delete')
						.on('click', e => {
							e.stopPropagation();
							deleteList(e.currentTarget.closest('.list-item'));
						})
				)
				.appendTo('.todolist');			
		}
	}

	// add a new list data into item data array
	function createList() {
		itemData.push({
			done: false,
			content: $('.add-content').val(),
		});
		renderList();
	}

	// delete a specific list data and its render 
	function deleteList(target) {
		// remove data, should before remove rendering
		itemData.splice($(target).index(), 1);
		// remove rendering
		target.remove();		
	}

	// toggle an existing list between complete and incomplete
	function completeList(target) {
		if(!itemData[target.index()].done) {
			itemData[target.index()].done = true;
		} else {
			itemData[target.index()].done = false;
		}
		renderList();
	}

	// edit an existing list
	function editList(target) {
		$(target.currentTarget).replaceWith(
			$('<input/>')
				.val(target.data.content)
				.on('keypress', e => {
					if(e.which == 13) {
						// edit data
						itemData[$(e.currentTarget).closest('.list-item').index()].content = $(e.currentTarget).val();
						renderList();
					}
				})
		);		
	}

	// filter list before render
	function filterList(type) {
		var filteredData;
		if(typeof type === 'boolean') {
			filteredData = itemData.filter(data => {
				return data.done === type;
			});
			return filteredData;	
		} else {
			return itemData;
		}
	}

})();