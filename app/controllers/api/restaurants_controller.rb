class Api::RestaurantsController < ApplicationController

  def index
    # @restaurants = sort_and_filter
    @restaurants = sort_restaurants(filter_restaurants)

    render :index
  end

  def filter_restaurants
    cuisine = params[:filterParams][:cuisine]
    offers = params[:filterParams][:offers]

    filtered = Restaurant.includes(:menu_items)

    ## filter by cuisine/text
    filtered = filter_by_cuisine(filtered, cuisine) unless cuisine.empty?

    ## filter by offers
    if offers[:takeout] === 'false'
      filtered = filter_by_offers(filtered, offers)
    end

    filtered
  end

  def filter_by_cuisine(restaurants, cuisine)
    search = cuisine.downcase.gsub(/\W+/, '')

    results = restaurants.select do |restaurant|
      restaurant_cuisine = restaurant.cuisine.downcase.gsub(/\W+/, '')
      restaurant_name = restaurant.name.downcase.gsub(/\W+/, '')

      restaurant_cuisine.include?(search) ||
      restaurant_name.include?(search) ||

      restaurant.menu_items.any? do |menu_item|
        menu_item.name.include?(search) ||
        menu_item.description.include?(search)
      end
    end

    results
  end

  def filter_by_offers(restaurants, offers)
    # only matters if delivery is "true" -- all restaurants offer takeout
    if offers[:delivery] === "true" && offers[:takeout] === "false"
     restaurants.reject { |r| r.takeout_only }
    else
     restaurants
    end
  end

  def sort_restaurants(restaurants)
    features = params[:filterParams][:features]
    sort_method = params[:filterParams][:sort]

    if features[:openOnTop] === 'true'
      sort_restaurants_open_on_top(restaurants, sort_method)
    else
      sort_restaurants_by_method(restaurants, sort_method)
    end
  end

  def sort_restaurants_open_on_top(restaurants, sort_method)
    current_hour = Time.now.hour*100

    open, closed = restaurants.partition do |restaurant|
      current_hour >= restaurant.opens_at &&
      current_hour < restaurant.closes_at
    end

    return sort_restaurants_by_method(open, sort_method).
            concat(sort_restaurants_by_method(closed, sort_method))
  end

  def sort_restaurants_by_method(restaurants, method)
    return restaurants if restaurants.nil?

    case method
    when "alphabetical"
      restaurants.sort_by { |restaurant| restaurant.name }
    when "distance"
      restaurants.sort_by { |restaurant | restaurant.distance_to }
    when "rating"
      restaurants.sort_by { |restaurant| restaurant.name }.reverse
    when "delivery_min"
      restaurants.sort_by { |restaurant| restaurant.delivery_min }
    when "delivery_fee"
      restaurants.sort_by { |restaurant| restaurant.delivery_fee }
    end
  end

  def show
    @restaurant = Restaurant.includes(:menu_items).find(params[:id])
    render :show
  end

end
