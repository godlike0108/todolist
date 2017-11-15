(function main() {
	const todolist = document.getElementsByClassName('todolist')[0];
	const listItem = document.getElementsByClassName('list-item');
	var filterMode = 'all';
	var listData = [];

	// attach createList function to button
	var addListButton = document.getElementsByClassName('add-btn');
	addListButton[0].onclick = function() {
		createList();
	};

	//attach filterToggle to button
	var filterDone = document.getElementById('done');
	filterDone.onclick = function() {
		filterToggle('done');
	}

	var filterUndone = document.getElementById('undone');
	filterUndone.onclick = function() {
		filterToggle('undone');
	}

	var filterAll = document.getElementById('all');
	filterAll.onclick = function() {
		filterToggle('all');
	}

	// Create a new list
	function createList() {
		var title = document.getElementsByClassName('add-list-title')[0].value;
		var date = document.getElementsByClassName('add-list-date')[0].value;
		var detail = document.getElementsByClassName('add-list-detail')[0].value;
		listData.push({
			title: title,
			date: date,
			detail: detail,
			complete: false,
			display: 'none',
		});
		renderList();
	}

	// Toggle between complete and incomplete
	function completeList(self) {
		console.log(self);
		var currentIndex = Array.from(self.parentNode.children).indexOf(self);
		if(listData[currentIndex].complete) {
			listData[currentIndex].complete = false;
			listData[currentIndex].display = 'none';
		} else {
			listData[currentIndex].complete = true;
			listData[currentIndex].display = 'block';
		}
		renderList();
	}

	// Delete specified completed list
	function deleteList(self) {
		var currentIndex = Array.from(self.parentNode.children).indexOf(self);
		console.log(currentIndex);
		console.log(listData.splice(currentIndex, 1));
		renderList();
	}

	// Filter the finished list and render
	function filterToggle(value) {
		filterMode = value;
		renderList();
	}

	// Render all list
	function renderList() {
		var newListItem;
		var newListTitle;
		var newListDate;
		var newListDetail;
		var delButton;
		var filterListData;

		//clean before every rendering
		deleteAll();

		// Filter listData before rendering
		if(filterMode === 'undone') {
			filterListData = listData.filter(function(listData) {
				return listData.complete === false;
			});
		} else if(filterMode === 'done') {
			filterListData = listData.filter(function(listData) {
				return listData.complete === true;
			});
		} else {
			filterListData = listData;
		}

		// Start rendering
		for(var i = 0; i < filterListData.length; i++) {
			newListItem = document.createElement('DIV');
			if(filterListData[i].complete) {
				newListItem.className = 'list-item complete';
			} else {
				newListItem.className = 'list-item';				
			}

			newListTitle = document.createElement('H3');
			newListTitle.className = 'list-title';
			newListTitle.appendChild(document.createTextNode(filterListData[i].title));

			newListDate = document.createElement('P');
			newListDate.className = 'list-date';
			newListDate.appendChild(document.createTextNode(filterListData[i].date));

			newListDetail = document.createElement('P');
			newListDetail.className = 'list-detail';
			newListDetail.appendChild(document.createTextNode(filterListData[i].detail));

			delButton = document.createElement('A');
			delButton.className = 'delete-button';
			delButton.appendChild(document.createTextNode('Delete'));
			delButton.setAttribute('href', '#');
			delButton.style.display = filterListData[i].display;

			newListItem.appendChild(newListTitle);
			newListItem.appendChild(newListDate);
			newListItem.appendChild(newListDetail);
			newListItem.appendChild(delButton);

			// give functions to each list items
			newListItem.onclick = function() {
				var self = this;
				completeList(self);
			};

			todolist.appendChild(newListItem);

			// delete a selected list item
			delButton.onclick = function() {
				var self = this.parentNode;
				deleteList(self);
				event.stopPropagation();
			}
		}
	}

	// Clean all list
	function deleteAll() {
		while(todolist.firstChild) {
			todolist.removeChild(todolist.firstChild);
		}
	}

})();
