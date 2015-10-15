class Api::RestaurantsController < ApplicationController

  def index
    cuisine = params[:filterParams][:cuisine]
    offers = params[:filterParams][:offers]
    features = params[:filterParams][:features]
    sort = params[:filterParams][:sort]

    @restaurants = Restaurant.all
    @restaurants = filter_by_cuisine(@restaurants, cuisine) unless cuisine.empty?
    @restaurants = filter_by_offers(@restaurants, offers) if offers[:takeout] == false

    if features[:openOnTop] === 'true'
      render json: sort_restaurants_open_on_top(@restaurants, sort)
    else
      render json: sort_restaurants(@restaurants, sort)
    end
  end

  def filter_by_cuisine(restaurants, cuisine)
    restaurants.select do |restaurant|
      restaurant.cuisine.downcase.include?(cuisine.downcase)
    end
  end

  def filter_by_offers(restaurants, offers)
    restaurants.filter do |restaurant|
      restaurant.takeout_only
    end
  end

  def filter_by_features
  end

  def sort_restaurants_open_on_top(restaurants, method)
    current_hour = Time.now.hour*100

    open, closed = restaurants.partition do |restaurant|
      current_hour >= restaurant.opens_at &&
      current_hour < restaurant.closes_at
    end

    return sort_restaurants(open, method).
            concat(sort_restaurants(closed, method))
  end

  def sort_restaurants(restaurants, method)
    return restaurants if restaurants.nil?

    case method
    when "alphabetical"
      return restaurants.sort_by { |restaurant| restaurant.name }
    when "distance"
      #need google maps distance API
      return restaurants.sort_by { |restaurant| restaurant.name }
    when "rating"
      #need ratings
      return restaurants.sort_by { |restaurant| restaurant.name }.reverse
    when "delivery_min"
      return restaurants.sort_by { |restaurant| restaurant.delivery_min }
    when "delivery_fee"
      return restaurants.sort_by { |restaurant| restaurant.delivery_fee }
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])

    render json: @restaurant
  end

end
