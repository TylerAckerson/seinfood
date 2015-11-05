# == Schema Information
#
# Table name: distances
#
#  id               :integer          not null, primary key
#  restaurant_id    :integer          not null
#  customer_address :string           not null
#  distance         :decimal(10, 4)
#

class Distance < ActiveRecord::Base
  validates :restaurant_id, :customer_address, :distance, null: false
end
