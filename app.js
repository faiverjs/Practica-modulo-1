$(document).ready(() => {
    
    const tasks = []
    let completedCount = 0
  
    
    function updateTaskCounters() {
      $("#pendingTasks").text(tasks.length - completedCount)
      $("#completedTasks").text(completedCount)
    }
  
   
    function addTask() {
      
      const taskText = $("#taskInput").val().trim()
  
      
      if (taskText === "") {
        alert("Por favor, ingresa una tarea")
        return
      }
  
      
      const task = {
        id: Date.now(), // Usar timestamp como ID único
        text: taskText,
        completed: false,
      }
  
      
      tasks.push(task)
  
      
      const taskElement = createTaskElement(task)
  
      
      $("#taskList").append(taskElement)
  
      
      $("#taskInput").val("")
  
      
      updateTaskCounters()
    }
  
    
    function createTaskElement(task) {
     
      const $taskItem = $("<li></li>").addClass("task-item").attr("data-id", task.id)
  
      
      const $taskText = $("<span></span>").addClass("task-text").text(task.text)
  
      
      const $taskActions = $("<div></div>").addClass("task-actions")
  
      
      const $completeBtn = $("<button></button>")
        .addClass("complete-btn")
        .text("Completar")
        .on("click", () => {
          toggleTaskCompletion(task.id)
        })
  
      
      const $deleteBtn = $("<button></button>")
        .addClass("delete-btn")
        .text("Eliminar")
        .on("click", () => {
          deleteTask(task.id)
        })
  
      
      $taskActions.append($completeBtn, $deleteBtn)
  
      // Añadir todos los elementos al li
      $taskItem.append($taskText, $taskActions)
  
     
      if (task.completed) {
        $taskItem.addClass("completed")
      }
  
      return $taskItem
    }
  
   
    function toggleTaskCompletion(taskId) {
      // Encontrar la tarea en el array
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
  
      if (taskIndex !== -1) {
        
        tasks[taskIndex].completed = !tasks[taskIndex].completed
  
        
        if (tasks[taskIndex].completed) {
          completedCount++
        } else {
          completedCount--
        }
  
        
        const $taskItem = $(`.task-item[data-id="${taskId}"]`)
        $taskItem.toggleClass("completed")
  
        
        const $completeBtn = $taskItem.find(".complete-btn")
        if (tasks[taskIndex].completed) {
          $completeBtn.text("Deshacer")
        } else {
          $completeBtn.text("Completar")
        }
  
       
        updateTaskCounters()
      }
    }
  
    
    function deleteTask(taskId) {
      
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
  
      if (taskIndex !== -1) {
        // Actualizar el contador si la tarea estaba completada
        if (tasks[taskIndex].completed) {
          completedCount--
        }
  
      
        tasks.splice(taskIndex, 1)
  
       
        $(`.task-item[data-id="${taskId}"]`).fadeOut(300, function () {
          $(this).remove()
          // Actualizar contadores
          updateTaskCounters()
        })
      }
    }
  
    
    $("#addTaskBtn").on("click", addTask)
  
   
    $("#taskInput").on("keypress", (e) => {
      if (e.which === 13) {
        // 13 es el código de tecla para Enter
        addTask()
      }
    })
  })
  