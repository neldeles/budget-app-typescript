

[# Fix Storybook stories](#DONE:-30)
States of the stories are now wonky after React Query and MSW implementations
<!-- Fix once updates to storybook-msw-addon library have been pushed
TODO:2021-11-28T03:06:43.219Z
DOING:2021-12-02T15:04:30.495Z
TODO:2021-12-03T11:40:43.886Z
DOING:2021-12-04T14:06:20.521Z
DONE:2021-12-05T04:42:09.178Z
completed:2021-12-05T04:42:09.178Z
-->
- [x] Upgrade to SB 6.4 and try fixing via interactive story
- [x] `LoginForm.Loading` story
  - [x] convert to an interactive story
- [x] `DashboardContainer.Default` story (username)
- [x] `Sidebar` story username not loading
- [x] `LoginScreen` action when sign in button is clicked
- [x] `BudgetDashboard` not loading properly

[# Migrate error messages to Toast](#TODO:30)
<!--
TODO:2021-11-28T05:55:52.591Z
-->

[# Hook the category group tables to the header date value](#DONE:-10)
- [x] add `created_at` and `deleted_at` columns to the DB factory
  - [x] fetch all category groups between `created_at` and `deleted_at`
    - [x] it should not render deleted category groups
    - [x] pass value of date picker to the `categoryGroupService.getAll`
      - [x] to do this, need to refactor DatePicker and lift state up.
      - [x] filter category groups where `created_at` <= `currDate`
<!--
DOING:2021-12-02T13:58:12.393Z
DONE:2021-12-02T13:59:39.856Z
completed:2021-12-02T13:59:39.856Z
-->

[# Create utility function for await loading in Tests](#TODO)
- https://github.com/kentcdodds/bookshelf/blob/main/src/__tests__/book-screen.js
<!--
created:2021-12-02T15:02:00.034Z
TODO:2021-12-02T15:02:06.316Z
-->

[# Set up `created_on_month`](#DONE:-20)
- [x] use this column as the creation date instead of the current time
- allows us to create category groups in selected months and have it
appear correctly for those months
- when you create a category group, `created_on_month` should be based on the selected month
  - [x] pass selected month to `created_on_selected_month` when creating a category group
<!--
TODO:2021-12-03T11:01:18.277Z
DOING:2021-12-03T11:40:36.773Z
DONE:2021-12-04T13:52:49.341Z
completed:2021-12-04T13:52:49.341Z
-->

[# Combine molecules and atoms folder](#DONE:-50)
- remove atoms and molecules folders and instead just have a single components folder
<!--
TODO:2021-12-05T04:45:49.569Z
is-epic:refactor-molecules-atoms
DOING:2021-12-05T04:46:18.978Z
DONE:2021-12-05T07:39:51.245Z
completed:2021-12-05T07:39:51.245Z
-->

[# `LoginForm`](#DONE:-40)
- colocate into `LoginScreen`
<!--
TODO:2021-12-05T04:43:14.298Z
epic:refactor-molecules-atoms
DOING:2021-12-05T04:46:38.643Z
DONE:2021-12-05T07:39:13.500Z
completed:2021-12-05T07:39:13.500Z
-->

[# `DashboardContainer`](#TODO)
- move to components folder

[# Refactor `render` method in tests](#TODO:-10)
<card>
> // The custom render returns a promise that resolves when the app has
> //   finished loading (if you're server rendering, you may not need this).
> // The custom render also allows you to specify your initial route

Source: https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests

<!--
created:2021-12-07T01:14:38.524Z
TODO:2021-12-07T01:15:21.768Z
-->
</card>