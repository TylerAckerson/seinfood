## Implementation Timeline (archive)

### Phase 1: Authentication, Restaurant Model + API, Home Page

In phase 1, I will start by creating both user 'sign in' and 'sign up'
pages. I will create an authentication system using BCrypt and then move
on to creating the Restaurant model and its associated JSON API to view
an index of restaurants, as well as a specific restaurant.

From there, I will spend some time creating the initial home/splash
page, where users will type in their current address to start searching
for matching restaurants near them.

[Details][phase-one]

### Phase 2: Flux, distance API, and Restaurant List

Phase 2 will be focused on setting up Flux, the main React Router
component, and the React components allowing users to view restaurants
in list form.

After the main Flux architecture has been set up, I will focus on
creating the 'Search Results' component, which will contain a
'Restaurant List' component to store specific 'Restaurant' components.
It will also allow users to sort and filter restaurants using a
'Filter' component. At the end of Phase 2, users should be able to type in their address
and receive a full list of restaurants near them. They should then be
able to filter and sort the restaurants.

I will start doing some basic styling with Bootstrap in Phase 2 and
begin seeding the database with both Users and Restaurants.

I will start by giving users all restaurant locations but will then use the Google maps API to determine the
distance of each restaurant from the user's location.

[Details][phase-two]

### Phase 3: Menus and Menu Items

The features implemented in Phase 3 will allow users to select specific
restaurants and view menus and menu items. There will
be a components to house each restaurants' menu, menu categories, and
specific menu items.

Again, I will seed the database -- this time with menus and menu items
to start testing the order-creation process.

[Details][phase-three]

### Phase 4: Order Creation and Completion

In Phase 4, I will ensure that orders can be created and committed to
the database by users. Users will be able to select menu items to view
details and add them to their Orders. I will also need to create a way for users to place orders without entering payment information.

After orders are submitted, the order statuses will be available,
letting users know that their order is now in process and being handled
by the restaurant.

[Details][phase-four]

### Phase 5: Account Component and Past Orders

Phase 5 will create an account view/component and allow users to view their past orders.

[Details][phase-five]

### Phase 6: Styling, Animation, and Cleanup

Phase 6 will be focused on adding styling and some effects to enhance
the user experience.

[Details][phase-six]
