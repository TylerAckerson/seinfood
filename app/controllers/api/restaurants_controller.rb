class Api::RestaurantsController < ApplicationController

  def index
    @restaurants = find_and_sort

    render :index
  end

  def find_and_sort

    #determine how to sort
    sort_method = case params[:filterParams][:sort]
      when "alphabetical"
        'name'
      when "distance"
        "distance"
      when "delivery_min"
        "delivery_min"
      when "delivery_fee"
        "delivery_fee"
      end

    search = params[:filterParams][:cuisine].downcase.gsub(/\W+/, '')
    offers = params[:filterParams][:offers]

    # determine whether or not to include takeout_only restaurants
    if (offers[:delivery] === "true" && offers[:takeout] === "false")
      takeout_options = "r.takeout_only = 'true' OR r.takeout_only = 'false'"
    elsif offers[:delivery] === "false"
      takeout_options = "r.takeout_only = 'true'"
    else
      takeout_options = "r.takeout_only = 'true' OR r.takeout_only = 'false'"
    end


    # create SELECT and ORDER BY statements if open on top is selected (default)
    if params[:filterParams][:features][:openOnTop] === "true"
      current_hour = Time.now.hour*100

      open_on_top_select = ", (#{current_hour} BETWEEN r.opens_at AND r.closes_at)"
      open_on_top_order = "(#{current_hour} BETWEEN r.opens_at AND r.closes_at) DESC,"
    end

    restaurants = Restaurant.find_by_sql(
      "SELECT
        r.* #{open_on_top_select}
      FROM
        restaurants as r
      INNER JOIN
        menu_items as m ON r.id = m.restaurant_id
      WHERE
        #{takeout_options}
      GROUP BY
        r.id
      HAVING
        lower(r.name) LIKE '%#{search}%' OR
        lower(r.cuisine) LIKE '%#{search}%' OR
        r.id IN (SELECT
                  r.id
                 FROM
                  restaurants as r
                 JOIN
                  menu_items as m ON r.id = m.restaurant_id
                 WHERE
                  lower(m.name) LIKE '%#{search}%' OR
                  lower(m.description) LIKE '%#{search}%'
                )
      ORDER BY
        #{open_on_top_order}
        r.#{sort_method} ASC")

    restaurants
  end

  def show
    @restaurant = Restaurant.includes(:menu_items).find(params[:id])
    render :show
  end

end
