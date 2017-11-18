'use strict';

(function () {

  var todos = [];
  var existingValues = void 0;

  function loadPrevValues() {
    existingValues = JSON.parse(localStorage.getItem('allVal'));
    if (existingValues !== null) {
      console.log(existingValues);
      todos = todos.concat(existingValues);
      sliceElements(todos);
    };
  }

  function getValuesFromForm() {
    if ($('#doneT').is(':checked')) {
      var _done = $('#doneT').val();
    } else if ($('#doneF').is(':checked')) {
      var _done2 = $('#doneF').val();
    }

    if ($('#priorityH').is(':checked')) {
      var _priority = $('#priorityH').val();
    } else if ($('#priorityM').is(':checked')) {
      var _priority2 = $('#priorityM').val();
    } else if ($('#priorityL').is(':checked')) {
      var _priority3 = $('#priorityL').val();
    }

    var todo = {
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

  function sliceElements(todoList) {
    var len = todoList.length;
    $('ol').empty();

    for (var i = 0; i < len; i++) {
      var elementArray = todoList.slice(i, i + 1);
      var elementObject = elementArray.reduce(function (acc, cur, i) {
        acc[i] = cur;
        return acc;
      }, {}); //converting the element array of objects into object of
      appendToList(elementObject);
    };
  }

  function appendToList(elementObject) {
    Object.keys(elementObject).forEach(function (key) {
      var getName = elementObject[key].name;
      var getTitle = elementObject[key].title;
      var getDone = elementObject[key].done;
      var getDueDate = elementObject[key].dueDate;
      var getPriority = elementObject[key].priority;
      var getUid = elementObject[key].uid;

      $('ol').append('<li class="form-control liChild">' + getName + ' : ' + getTitle + ' : ' + getDone + ' : ' + getDueDate + ' : ' + getPriority + '</li>');
      $('li:last-child').attr('data-uid', getUid);
    });
  }

  function updateLocalStorageOnSort(event, ui) {

    var updatedListLen = $(event.target).children().length;
    var todosLen = todos.length;

    var newTodos = [];

    //working properly-----------------------------------------------------------
    for (var i = 0; i < updatedListLen; i++) {
      for (var j = 0; j < todosLen; j++) {
        if (todos[j].uid == event.target.children[i].attributes[1].nodeValue) {
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

  $(document).on('click', 'li', function () {
    $(this).toggleClass('bg-secondary');
  });

  //localStorage.removeItem('allVal');

  $('#list').sortable({
    axis: 'y',
    stop: updateLocalStorageOnSort(event, ui)
  });

  //$("#list").disableSelection(); //jquery ui	
})();
