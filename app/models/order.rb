# == Schema Information
#
# Table name: orders
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  restaurant_id :integer          not null
#  scheduled_for :datetime         not null
#  order_type    :string           not null
#  status        :string           default("In Process")
#  subtotal      :decimal(, )      not null
#  delivery_fee  :decimal(, )      not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Order < ActiveRecord::Base
  validates :user_id, :restaurant_id, :order_type, :subtotal, :delivery_fee, presence: true

  belongs_to :user
  belongs_to :restaurant
end
