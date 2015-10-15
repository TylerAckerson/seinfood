json.array!(@restaurants) do |restaurant|
  json.extract(restaurant)
  json.distance restaurant.distance_to
end
