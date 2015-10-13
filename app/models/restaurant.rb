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
#

class Restaurant < ActiveRecord::Base
  validates :name, :cuisine, :address, :city, :state, presence: true

  def index
    @restaurants = Restaurant.all
  end

  def show
    @restaurant = Restaurant.find(params[:id])
  end

end