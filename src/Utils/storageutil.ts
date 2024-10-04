import { taskModel } from "./Models";

export const getTaskFromStorage=():taskModel[]=>{

const tasks= localStorage.getItem('tasks');
return tasks ? JSON.parse(tasks) :[]

}

export const saveTaskToStorage=(tasks:taskModel[]):void=>{

localStorage.setItem('tasks',JSON.stringify(tasks));
}