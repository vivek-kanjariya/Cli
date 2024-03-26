class Task {
    constructor(id, title, completed = false) {
      this.id = id;
      this.title = title;
      this.completed = completed;
    }
  }
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let tasks = [];
  let nextId = 1;
  
  function addTask(title) {
    const task = new Task(nextId++, title);
    tasks.push(task);
    console.log(`Task added: ${task.title}`);
  }
  
  function viewTasks() {
    if (tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      console.log('Tasks:');
      tasks.forEach(task => {
        const status = task.completed ? '[x]' : '[ ]';
        console.log(`${status} ${task.id}. ${task.title}`);
      });
    }
  }
  
  function markTaskComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.completed = true;
      console.log(`Task ${task.id} marked as complete.`);
    } else {
      console.log('Task not found.');
    }
  }
  
  function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      console.log(`Task ${id} deleted.`);
    } else {
      console.log('Task not found.');
    }
  }
  
  rl.on('line', input => {
    const [command, ...args] = input.trim().split(' ');
    switch (command) {
      case 'add':
        addTask(args.join(' '));
        break;
      case 'view':
        viewTasks();
        break;
      case 'complete':
        markTaskComplete(parseInt(args[0]));
        break;
      case 'delete':
        deleteTask(parseInt(args[0]));
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('Invalid command. Try again.');
    }
  });
  
  console.log('Task Manager CLI');
  console.log('Commands: add <task>, view, complete <task-id>, delete <task-id>, exit');
  