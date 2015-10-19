# == Schema Information
#
# Table name: menu_items
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  description   :string           not null
#  category      :string           not null
#  restaurant_id :integer          not null
#  archived      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  price         :float            default(0.0)
#

class MenuItem < ActiveRecord::Base
  validates :name, :description, :category, :restaurant_id, presence: true

  belongs_to :restaurant
end
