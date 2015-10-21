json.extract! @restaurant, :id, :name, :cuisine, :address, :city, :state,
                           :opens_at, :closes_at, :delivery_min,
                           :delivery_fee, :takeout_only, :image_link

json.menu_items do
  json.array! @restaurant.menu_items do |menu_item|
    json.extract! menu_item, :id, :name, :description, :category, :price
  end
end

json.distance @restaurant.distance_to
