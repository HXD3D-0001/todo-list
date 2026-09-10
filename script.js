const input = document.getElementById('taskInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const stats = document.getElementById('stats');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render(){
  list.innerHTML='';
  tasks.forEach((task,index)=>{
    const li=document.createElement('li');
    li.innerHTML=`<span class="${task.done?'done':''}">${task.text}</span><button>删除</button>`;
    li.querySelector('span').onclick=()=>{
      tasks[index].done=!tasks[index].done;
      save(); render();
    };
    li.querySelector('button').onclick=()=>{
      tasks.splice(index,1);
      save(); render();
    };
    list.appendChild(li);
  });
  stats.textContent=`共 ${tasks.length} 个任务，完成 ${tasks.filter(t=>t.done).length} 个`;
}

btn.onclick=()=>{
  const text=input.value.trim();
  if(!text) return;
  tasks.push({text,done:false});
  input.value='';
  save(); render();
};

render();
