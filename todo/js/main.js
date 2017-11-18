(function(){

	let todos = [];
  let existingValues;

  function loadPrevValues() {
    existingValues = JSON.parse(localStorage.getItem('allVal'));
      if (existingValues !== null){
        console.log(existingValues);
        todos = todos.concat(existingValues);
        sliceElements(todos);
      };
  }

  function getValuesFromForm() {
    if ($('#doneT').is(':checked')) {
      let done = ($('#doneT').val());
    }
    else if ($('#doneF').is(':checked')) {
      let done = ($('#doneF').val());
    }

    if ($('#priorityH').is(':checked')) {
      let priority = ($('#priorityH').val());
    }
    else if ($('#priorityM').is(':checked')) {
      let priority = ($('#priorityM').val());
    }
    else if ($('#priorityL').is(':checked')) {
      let priority = ($('#priorityL').val());
    }
    
    let todo = {
        name: $('#name').val(),
        title: $('#title').val(),
        done: done,
        dueDate: $('#dueDate').val(),
        priority: priority,
        uid: new Date().getTime()
      };
    todos.push(todo);
    
    console.log(todos);
    localStorage.setItem("allVal", JSON.stringify(todos));
    sliceElements(todos);
    $("input[name='task']").val('');
  }

  function sliceElements(todoList){
    let len = todoList.length;
    $('ol').empty();

    for (let i = 0; i<len; i++) {
      let elementArray = todoList.slice(i, i+1);
      let elementObject = elementArray.reduce(function(acc, cur, i) {
          acc[i] = cur;
          return acc;
      }, {}); //converting the element array of objects into object of
      appendToList(elementObject);
    };
  }

  function appendToList (elementObject) {
    Object.keys(elementObject).forEach((key) => {
      let getName = elementObject[key].name;
      let getTitle = elementObject[key].title;
      let getDone = elementObject[key].done;
      let getDueDate = elementObject[key].dueDate;
      let getPriority = elementObject[key].priority;
      let getUid = elementObject[key].uid;

      $('ol').append('<li class="form-control liChild">' + getName + ' : ' + getTitle + ' : ' + getDone + ' : ' + getDueDate + ' : ' + getPriority + '</li>');
      $('li:last-child').attr('data-uid', getUid);
    });
  }

  function updateLocalStorageOnSort (event, ui) {
          
    let updatedListLen = $(event.target).children().length;
    let todosLen = todos.length;
    
    let newTodos = [];

    //working properly-----------------------------------------------------------
    for (let i = 0; i < updatedListLen; i++) {
      for (let j = 0; j < todosLen; j++) {
        if(todos[j].uid == event.target.children[i].attributes[1].nodeValue) {
          newTodos.push(todos[j]);
          break;
        };
      }
    };

    console.log(newTodos);
    localStorage.setItem("allVal", JSON.stringify(newTodos));
  }

	$(window).on('load', loadPrevValues());
    
  $('#button').on('click', getValuesFromForm());	

  $(document).on('click', 'li', function() {
  	$(this).toggleClass('bg-secondary');
  });
    
  //localStorage.removeItem('allVal');
  	
	$('#list').sortable({
    axis: 'y',
    stop: updateLocalStorageOnSort (event, ui)
	});

	//$("#list").disableSelection(); //jquery ui	

})();