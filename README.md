# Assumptions
I relied on the behavior of the [sample](https://d3905n0khyu9wc.cloudfront.net/assessment/todo-js/todo_v3.html) in cases where the requirements were not explicit:
1) Clicking the modals "Mark as Complete" button for a completed task should not update the todo to incomplete
2) Categories in the sidebar should be listed by date in ascending order
3) Displayed todos should be ordered first by completeness then by ID (not by due date)
4) From the requirements: "When a todo is toggled/deleted the currently selected todo group should not change." This also applies to editing a todo.

# Discussion
* Recreating bindings with each new display