#! /usr/bin/env node

import inquirer from "inquirer";

let todoList: string[] = [];

let main = async () => {
  for (let condition = true; condition; ) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option",
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      condition = false;
    } else if (option.choice === "Delete Task") {
      await completedTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    }
  }
};

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "Enter your task",
    },
  ]);
  todoList.push(newTask.task);
  console.log(`\n ${newTask.task} task has been added in your Todo-List`);
};

// Function to view all Todo-List items

let viewTask = () => {
  console.log("\n Your Todo-Lst: \n");
  for (let i = 0; i < todoList.length; i++) {
    console.log(`${i + 1} : ${todoList[i]}`);
  }
};

// function to delete Task

let completedTask = async () => {
  let todoDelete = await inquirer.prompt({
    name: "delete",
    type: "confirm",
    message: "Do you have completed any task from TODO-List ? ",
  });

  if (todoDelete.delete) {
    let deleteitem = await inquirer.prompt({
      name: "item",
      choices: todoList,
      type: "list",
      message: "Select your completed task : ",
    });

    if (todoList.includes(deleteitem.item)) {
      let index: number = todoList.indexOf(deleteitem.item);
      todoList.splice(index, 1);
      console.log("Your completed task has been deleted.");
    }
  }
};

// Function to Update previous task

let updateTask = async () => {
  let updatedTask = await inquirer.prompt([
    {
      name: "item",
      choices: todoList,
      type: "list",
      message: "Select the task you want to update : ",
    },
    {
      name: "newTask",
      type: "input",
      message: "Now enter the new task: ",
    },
  ]);
  todoList[updatedTask.item] = updatedTask.newTask;
  console.log(`\n Task has been updated to ${updatedTask.newTask}`);
};

main();
