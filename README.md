## Assumptions
### Using sample
I relied on the behavior of the [sample](https://d3905n0khyu9wc.cloudfront.net/assessment/todo-js/todo_v3.html) in cases where the requirements were not explicit:
1) Clicking the modal's "Mark as Complete" button for an already-completed todo should not update the todo to incomplete
2) After "No Due Date", categories in the sidebar should be listed in ascending order by date
3) Displayed todos should be ordered first by completeness then in ascending order by ID (not by due date)

### Other
1) If the app encounters an error while saving a new todo, the UI remains on the currently selected category. This is in contrast to when a new todo is successfully saved, which results in the UI displaying "All Groups"
