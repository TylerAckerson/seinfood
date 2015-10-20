monks = Restaurant.create!( name: "Monk's Cafe",
                            cuisine: "American",
                            address: "2880 Broadway",
                            city: "New York City",
                            state: "NY",
                            delivery_fee: 2.00,
                            delivery_min: 12.00);

hop_shing = Restaurant.create!( name: "Hop Shing",
                            cuisine: "Chinese",
                            address: "9 Chatham Square",
                            city: "New York City",
                            state: "NY",
                            delivery_fee: 1.00,
                            delivery_min: 8.00);

soup_stand = Restaurant.create!( name: "Soup Stand",
                            cuisine: "Soups",
                            address: "259-A West 55th Street",
                            city: "New York City",
                            state: "NY",
                            opens_at: 1100,
                            closes_at: 1800,
                            takeout_only: true );

dream_cafe = Restaurant.create!( name: "Dream Cafe",
                            cuisine: "Pakistani",
                            address: "478 9th Ave",
                            city: "New York City",
                            state: "NY",
                            opens_at: 1000,
                            closes_at: 2200,
                            delivery_fee: 3.0,
                            delivery_min: 4.75);


#  id            :integer          not null, primary key
#  name          :string           not null
#  description   :string           not null
#  category      :string           not null
#  restaurant_id :integer          not null
#  archived      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
menuItem1 = MenuItem.create!( name: "The Big Salad",
                              description: "a big salad",
                              category: "Salads",
                              restaurant_id: monks.id,
                              price: 7.00);

menuItem2 = MenuItem.create!( name: "Small Salad",
                              description: "a normal sized salad",
                              category: "Salads",
                              restaurant_id: monks.id,
                              price: 1.50);

menuItem3 = MenuItem.create!( name: "Coffee",
                              description: "black, with no cream",
                              category: "Beverages",
                              restaurant_id: monks.id,
                              price: 1.50);

menuItem4 = MenuItem.create!( name: "Iced Tea",
                              description: "Sweet or not",
                              category: "Beverages",
                              restaurant_id: monks.id,
                              price: 2.00);

menuItem5 = MenuItem.create!( name: "Chicken Salad",
                              description: "Best on Rye",
                              category: "Sandwiches",
                              restaurant_id: monks.id,
                              price: 6.50);
