/* Any JavaScript here will be loaded for all users on every page load. */

$('#color-picker .radioButtonSpan label').each(function(){
    var color = $(this).find('input').val();
    $(this).css({'background':'' + color + '', 'color': '' + color + '','width': '200px', 'padding': '.25rem 1rem'});
});

/* Drag-and-drop for Kanban board. */

$('td.kanban-tile').attr('draggable', true);

var items = document.querySelectorAll('td.kanban-tile');
items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
});
  
function handleDragStart(e) {
  this.style.opacity = '0.4';
  $taskInOrigLocation = $(this);
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  this.style.opacity = '1';
}

$('table.kanban-tasks').parent('td')
.on('drop', function(e) {
  e.preventDefault();
  var taskName = $taskInOrigLocation.find('div.title a').attr('title');
  var $origTaskTable = $taskInOrigLocation.closest('table.kanban-tasks');
  var oldColumnNum = $('table.kanban-tasks').index($origTaskTable);
  var $oldNumTasksDisplay = $('.kanban-num-tasks').eq(oldColumnNum);
  var newColumnNum = $('table.kanban-tasks').index($(this).find('table.kanban-tasks'));
  var $newNumTasksDisplay = $('.kanban-num-tasks').eq(newColumnNum);
  var newStatus = $(this).attr('data-status');
  var newClass = newStatus.replaceAll(' ', '-').toLowerCase();

  var $kanbanTask = $('<tr><td class="kanban-tile" draggable="true"></td></tr>');
  $kanbanTask.find('td').html($taskInOrigLocation.html());
  $kanbanTask.find('div.title').attr('class', 'title '+ newClass);
  $(this).find('tbody').append($kanbanTask);
  $taskInOrigLocation.parent().remove();
  $oldNumTasksDisplay.text(parseInt($oldNumTasksDisplay.text()) - 1);
  $newNumTasksDisplay.text(parseInt($newNumTasksDisplay.text()) + 1);
  
  var apiURL = mw.config.get( 'wgScriptPath' ) + '/api.php?action=pfautoedit&form=Task&target=' +
	encodeURIComponent(taskName) + '&query=Task[Status]=' + newStatus;
  $.get(apiURL);
  var actualItem = $kanbanTask.find('td')[0];
  actualItem.addEventListener('dragstart', handleDragStart);
  actualItem.addEventListener('dragend', handleDragEnd);
})
.on('dragover', function(e) {
   e.preventDefault();
});
