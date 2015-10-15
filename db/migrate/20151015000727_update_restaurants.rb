class UpdateRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :delivery_fee, :float, default: 0
    add_column :restaurants, :takeout_only, :boolean, default: false
  end
end
