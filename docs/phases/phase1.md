# Phase 1: Authentication, Restaurant Model + API, Home Page

## Rails
### Models
* User
* Restaurant

### Controllers
* UsersController (create, new, update)
* SessionsController (create, new, destroy)
* Api::RestaurantsController (index, show)

### Views
* users/new.html.erb
* session/new.html.erb

* home.html.erb

* restaurants/index.json.jbuilder
* restaurants/show.json.jbuilder

## Flux
### Views (React Components)
* App
  - Search form

### Stores
* n/a

### Actions
* n/a

### ApiUtil
* ApiUtil.fetchAllRestaurants
* ApiUtil.fetchSingleRestaurant

## Gems/Libraries
* BCrypt
* SecureRandom
* Jbuilder
