class Api::RestaurantsController < ApplicationController

  def index
    cuisine = params[:filterParams][:cuisine]
    sort = params[:filterParams][:sort]
    offers = params[:filterParams][:offers]
    features = params[:filterParams][:features]

    @restaurants = Restaurant.all.select do |restaurant|
      (cuisine == restaurant.cuisine || cuisine.empty?)
      #need to add field for offers and features for restaurants
    end

    render json: sort_restaurants(@restaurants, sort)
  end

  def sort_restaurants(restaurants, method)
    case method
    when "alphabetical"
      return restaurants.sort_by { |restaurant| restaurant.name }
    when "distance"
      #need google maps distance API
      return restaurants.sort_by { |restaurant| restaurant.name }.shuffle
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
