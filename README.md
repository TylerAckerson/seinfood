# Seinfood

[Heroku link][heroku]

[heroku]: https://seinfood.herokuapp.com/

## Minimum Viable Product

Seinfood is a [Seinfeld][seinfeld]-themed web application inspired by
[EatStreet][eatstreet], which allows users to order delivery and takeout
from fictional restaurants featured in the classic 90s sitcom. It was
created using Ruby on Rails and React.js at Kramerica Industries.

Seinfood allows users to:

- [ ] Create an account
- [ ] Sign in / sign out
- [ ] Search for restaurants in New York City... in the 90s.. from Seinfeld
- [ ] Sort and filter restaurants
- [ ] View restaurant details and menu items
- [ ] Create orders and check out
- [ ] Save favorite menu items and restaurants
- [ ] Review past orders

[seinfeld]: https://en.wikipedia.org/wiki/Seinfeld
[eatstreet]: https://eatstreet.com/

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

# Phase 1: User Authentication, Restaurant Model and API, Home Page (2 days)

In phase 1, I will start by creating both user 'sign in' and 'sign up'
pages. I will create an authentication system using BCrypt and then move
on to creating the Restaurant model and its associated JSON API to view
an index of restaurants, as well as a specific restaurant.

From there, I will spend some time creating the initial home/splash
page, where users will type in their current address to start searching
for matching restaurants near them.

[Details][phase-one]

### Phase 2: Flux Architecture, Google Maps API, and Restaurant List (2 days)

Phase 2 will be focused on setting up Flux, the main React Router
component, and the React components allowing users to view restaurants
in list form.

After the main Flux architecture has been set up, I will focus on
creating the 'Search Results' component, which will contain a
'Restaurant List' component to store specific 'Restaurant' components.
It will also allow users to sort and filter restaurants using a
'Filter' component. I will use the Google maps API to determine the
distance of each restaurant from the user's location.

At the end of Phase 2, users should be able to type in their address
and receive a full list of restaurants near them. They should then be
able to filter and sort the restaurants.

I will start doing some basic styling with Bootstrap in Phase 2 and
begin seeding the database with both Users and Restaurants.

[Details][phase-two]

### Phase 3: Menus, Menu Items (1.5 days)

The features implemented in Phase 3 will allow users to select specific
restaurants and view menus and menu items. There will
be a components to house each restaurants' menu, menu categories, and
specific menu items.

Again, I will seed the database -- this time with menus and menu items
to start testing the order-creation process.

[Details][phase-three]

### Phase 4: Order Creation and Completion (1.5 day)

In Phase 4, I will ensure that orders can be created and committed to
the database by users. Users will be able to select menu items to view
details and add them to their Orders.

After orders are submitted, the order statuses will be available,
letting users know that their order is now in process and being handled
by the restaurant.

In order to complete orders, very basic credit card processing will be
required. I will just validate that the user's VISA has the correct
number and format of digits.

[Details][phase-four]

### Phase 5: Past Orders and Favorites (1 day)

Phase 5 will allow for users to review their past orders from their
account page. They will also be able to favorite menu items and
restaurants.

[Details][phase-five]

### Phase 6: # Phase 6: Styling, Animation, and Cleanup (1 day)

Phase 6 will be focused on adding styling and some effects to enhance
the user experience.

### Potential Bonus Features
- [ ] Allow users to view restaurant reviews pulled from Yelp
- [ ] Allow users to view a map of available restaurants
- [ ] Allow users to search for menu items
- [ ] Allow users to use coupons
- [ ] Allow users to enroll in rewards programs

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
