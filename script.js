//get data from data in form submit,
// store that data in a global array
// careate a display function to display all the data form array to out entery list
let emptyarr = [];
let taskList = [];

let badlist = [];

const hrperWeek = 24 * 7;

const handelonSubmit = (e) => {
  const frmdata = new FormData(e);
  const task = frmdata.get("task");
  const hr = +frmdata.get("hr");

  const obj = {
    task,
    hr,
  };

  const totalAllocationhr = totalTaskHours();
  if (totalAllocationhr + hr > hrperWeek) {
    return alert("sorry you cant any more");
  }
  taskList.push(obj);
  displayTasks();
  totalTaskHours();
};

const displayTasks = () => {
  let str = "";

  taskList.map((elm, i) => {
    str += `
    <tr class = "text-end">
    <td>${i + 1}</td>
     <td>${elm.task}</td>
     <td>${elm.hr}</td>
     <td>
     <button onclick="deleteTask(${i})" class="btn btn-danger "><i class="fa-regular fa-trash-can"></i></button>
     <button onclick ="markasNottoDO(${i})"class="btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button></td>
   </tr>`;
  });

  document.getElementById("task-list").innerHTML = str;
  innerHTML = str;
};

const totalTaskHours = () => {
  const total = taskList.reduce((subttl, elm) => {
    return subttl + elm.hr;
  }, 0);

  document.getElementById("totalhrs").innerText = total + totalbadTaskHours();

  return total;
};

const deleteTask = (i) => {
  if (!window.confirm("Are you sure you want to delte this task")) {
    return;
  }

  taskList = taskList.filter((elm, index) => index !== i);
  totalTaskHours();
  displayTasks();
};

const displaybadtask = () => {
  let str = "";
  badlist.map((item, i) => {
    str += `
          <tr class="text-end">
          <td>${i + 1}</td>
           <td>${item.task} tv</td>
           <td>${item.hr}</td>
           <td>
              
               <button  onclick ="markasNottoDObadlist(${i})" class="btn btn-warning"><i class="fa-solid fa-arrow-left"></i></i></button>
              <button onclick="deletebadlistTask(${i})" class="btn btn-danger "><i class="fa-regular fa-trash-can"></i></button>
          
          </td>
         </tr>`;
  });
  document.getElementById("bad_list").innerHTML = str;
  totalbadTaskHours();
};

const markasNottoDO = (i) => {
  const itm = taskList.splice(i, 1);
  badlist.push(itm[0]);
  displaybadtask();
  displayTasks();
  totalTaskHours();
};

const deletebadlistTask = (i) => {
  if (!window.confirm("Are you sure you want to delte this task")) {
    return;
  }

  badlist = badlist.filter((elm, index) => index !== i);
  displaybadtask();
  totalTaskHours();
};

const markasNottoDObadlist = (i) => {
  const itm = badlist.splice(i, 1);
  taskList.push(itm[0]);
  displayTasks();
  displaybadtask();
  totalTaskHours();
};

const totalbadTaskHours = () => {
  const total = badlist.reduce((subttl, elm) => {
    return subttl + elm.hr;
  }, 0);

  document.getElementById("badtllt").innerText = total;

  return total;
};

const clearall = () => {};
