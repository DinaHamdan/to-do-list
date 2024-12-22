const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => li.remove());

    li.addEventListener('click', () => li.classList.toggle('completed'));

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = ''; // Clear the input
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => ({
        text: task.textContent.replace('Delete', '').trim(),
        completed: task.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ text, completed }) => {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) li.classList.add('completed');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(li);
    });
}


taskForm.addEventListener('submit', (e) => {
    addTask(e);
    saveTasks();
});
window.addEventListener('load', loadTasks);
