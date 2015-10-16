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
#

class Restaurant < ActiveRecord::Base
  validates :name, :cuisine, :address, :city, :state, presence: true

  def index
    @restaurants = Restaurant.all
  end

  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def distance_to
    matrix = GoogleDistanceMatrix::Matrix.new
    # matrix.configure { |matrix| matrix.units = "IMPERIAL" }

    origin = GoogleDistanceMatrix::Place.new address: self.address
    matrix.origins << origin

    destination = GoogleDistanceMatrix::Place.new address: "new york city new york"
    matrix.destinations << destination

    return matrix.data[0][0].distance_text
  end



end
