MenuItem.create!([
  {name: "The Big Salad", description: "a big salad", category: "Salads", restaurant_id: 1, archived: false, price: 7.0},
  {name: "Small Salad", description: "a normal sized salad", category: "Salads", restaurant_id: 1, archived: false, price: 1.5},
  {name: "Coffee", description: "black, with no cream", category: "Beverages", restaurant_id: 1, archived: false, price: 1.5},
  {name: "Iced Tea", description: "Sweet or not", category: "Beverages", restaurant_id: 1, archived: false, price: 2.0},
  {name: "Chicken Salad", description: "Best on Rye", category: "Sandwiches", restaurant_id: 1, archived: false, price: 6.5}
])
Restaurant.create!([
  {name: "Monk's Cafe", cuisine: "American", address: "2880 Broadway", city: "New York City", state: "NY", yelp_id: nil, opens_at: 800, closes_at: 2200, delivery_min: 12.0, delivery_fee: 2.0, takeout_only: false, image_link: "https://dl.dropboxusercontent.com/u/4448887/seinfood/1.jpg"},
  {name: "Hop Shing", cuisine: "Chinese", address: "9 Chatham Square", city: "New York City", state: "NY", yelp_id: nil, opens_at: 800, closes_at: 2200, delivery_min: 8.0, delivery_fee: 1.0, takeout_only: false, image_link: "https://dl.dropboxusercontent.com/u/4448887/seinfood/2.jpg"},
  {name: "Soup Stand", cuisine: "Soups", address: "259-A West 55th Street", city: "New York City", state: "NY", yelp_id: nil, opens_at: 1100, closes_at: 1800, delivery_min: 0.0, delivery_fee: 0.0, takeout_only: true, image_link: "https://dl.dropboxusercontent.com/u/4448887/seinfood/3.jpg"},
  {name: "Dream Cafe", cuisine: "Pakistani", address: "478 9th Ave", city: "New York City", state: "NY", yelp_id: nil, opens_at: 1000, closes_at: 2200, delivery_min: 4.75, delivery_fee: 3.0, takeout_only: false, image_link: "https://dl.dropboxusercontent.com/u/4448887/seinfood/4.jpg"},
])
