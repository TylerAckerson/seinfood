# Database Schema

## users
    column name | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
address         | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## restaurants
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | text      | not null
cuisine        | text      | not null
address        | text      | not null
city           | text      | not null, default "New York City"
state          | text      | not null, default "New York"
yelp_id        | integer   |
delivery_days  | text      |
delivery_start | integer   |
delivery_end   | integer   |
delivery_min   | integer   |
takeout_days   | text      |
takeout_start  | integer   |
takeout_end    | integer   |

## menu items
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | string    | not null, primary key
description    | string    | not null, primary key
category       | string    | not null, indexed
restaurant_id  | string    | not null, foreign key (references restaurants), indexed
archived       | boolean   | not null, default: false

## orders
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
user_id        | integer   | not null, foreign key (references users), indexed
restaurant_id  | string    | not null, foreign key (references restaurants), indexed
date           | datetime  | not null
scheduled_for  | datetime  | not null
type           | string    | not null (delivery vs takeout)
status         | string    | not null
subtotal       | float     | not null
tax            | float     | not null
delivery fee   | float     | not null

## order items
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
order_id       | integer   | not null, foreign key (references orders), indexed
menu_item_id   | integer   | not null, foreign key (references menu items), indexed
quantity       | integer   | not null
notes          | string    |

# ratings will come from Yelp API
