# == Schema Information
#
# Table name: restaurants
#
#  id           :integer          not null, primary key
#  name         :text             not null
#  cuisine      :text             not null
#  address      :text             not null
#  city         :text             default("New York City")
#  state        :text             default("New York")
#  yelp_id      :integer
#  opens_at     :integer          default(800)
#  closes_at    :integer          default(2200)
#  delivery_min :float            default(0.0)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  delivery_fee :float            default(0.0)
#  takeout_only :boolean          default(FALSE)
#  image_link   :text
#

class Restaurant < ActiveRecord::Base
  validates :name, :cuisine, :address, :city, :state, presence: true

  has_many :menu_items
  has_many :orders
  has_many :users, through: :orders

  def index
    @restaurants = Restaurant.all
  end

  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def distance_to
    Geokit::Geocoders::GoogleGeocoder.api_key = 'AIzaSyD2gX_6Ud5ZYiD-7vKI3yxfKkmPpfJML4A'
    restaurant = Geokit::Geocoders::GoogleGeocoder.geocode self.address
    customer = Geokit::Geocoders::GoogleGeocoder.geocode 'new york city new york'

    return restaurant.distance_to(customer)
    # return 0
  end
end
