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
                            delivery_fee: 0.50,
                            delivery_min: 4.75);
