class Api::RestaurantsController < ApplicationController

  def index
    cuisine = params[:filterParams][:cuisine]
    offers = params[:filterParams][:offers]
    features = params[:filterParams][:features]
    sort = params[:filterParams][:sort]

    @restaurants = Restaurant.all
    @restaurants = filter_by_cuisine(@restaurants, cuisine) unless cuisine.empty?

    if offers[:takeout] === 'false'
      @restaurants = filter_by_offers(@restaurants, offers)
    end

    if features[:openOnTop] === 'true'
      @restaurants = sort_restaurants_open_on_top(@restaurants, sort)
    else
      @restaurants = sort_restaurants(@restaurants, sort)
    end
    render :index
  end

  def filter_by_cuisine(restaurants, cuisine)
    restaurants.select do |restaurant|
      restaurant.cuisine.downcase.include?(cuisine.downcase)
    end
  end

  def filter_by_offers(restaurants, offers)
    if offers[:delivery] === "true" && offers[:takeout] === "false"
     restaurants.reject { |r| r.takeout_only }
    elsif
      offers[:delivery] === "true" && offers[:takeout] === "true"
     restaurants
    else
     restaurants
    end
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
      restaurants.sort_by { |restaurant| restaurant.name }
    when "distance"
      restaurants.sort_by { |rest| rest.distance_to.split.first.to_f }
    when "rating"
      restaurants.sort_by { |restaurant| restaurant.name }.reverse
    when "delivery_min"
      restaurants.sort_by { |restaurant| restaurant.delivery_min }
    when "delivery_fee"
      restaurants.sort_by { |restaurant| restaurant.delivery_fee }
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    render json: @restaurant
  end

end
