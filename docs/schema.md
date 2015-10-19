# Database Schema

## users
    column name | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
address         | text      | not null
city            | text      | not null, default "New York City"
state           | text      | not null, default "New York"
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
opens_at       | integer   |
closes_at      | integer   |
delivery_min   | float   |

## menu items
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | string    | not null
description    | string    | not null
category       | string    | not null, indexed
restaurant_id  | integer   | not null, foreign key (references restaurants), indexed
archived       | boolean   | default: false
price          | float     | default: 0.0

## orders
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
user_id        | integer   | not null, foreign key (references users), indexed
restaurant_id  | string    | not null, foreign key (references restaurants), indexed
scheduled_for  | datetime  | not null
type           | string    | not null (delivery vs takeout)
status         | string    | not null
subtotal       | float     | not null
delivery fee   | float     | not null

## order items
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
order_id       | integer   | not null, foreign key (references orders), indexed
menu_item_id   | integer   | not null, foreign key (references menu items), indexed
quantity       | integer   | not null
notes          | text      |

## reviews
   column name | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
author_id      | integer   | not null, foreign key (references users), indexed
restaurant_id  | integer   | not null, foreign key (references restaurants), indexed
stars          | integer   | not null
title          | string    | not null
body           | text      | not null
