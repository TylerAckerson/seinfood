class Distance < ActiveRecord::Base
  validates :restaurant_id, :customer_address, :distance, null: false
end
