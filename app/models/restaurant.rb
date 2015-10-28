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

  def distance_to(customer_location)
    customer_address = customer_location + " new york city new york"
    restaurant_address = "#{self.address} #{self.city} #{self.state}"
    restaurant_id = self.id

    @distance = Distance.find_by({ restaurant_id: self.id,
                                 customer_address: customer_address})

    unless @distance.nil?
      @distance.distance
    else
      create_distance(self.id, self.address, customer_address)
    end
  end

  def create_distance(restaurant_id, restaurant_address, customer_address)
    Geokit::Geocoders::GoogleGeocoder.api_key = 'AIzaSyBY68ewUz3zHC2jnS9JCd60zAezMQvuoF4'
    restaurant = Geokit::Geocoders::GoogleGeocoder.geocode restaurant_address
    customer = Geokit::Geocoders::GoogleGeocoder.geocode customer_address
    distance = restaurant.distance_to(customer)

    Distance.create!( {   restaurant_id: restaurant_id,
                       customer_address: customer_address,
                               distance: distance } )

    distance
  end
end
