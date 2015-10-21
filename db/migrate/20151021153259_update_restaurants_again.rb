class UpdateRestaurantsAgain < ActiveRecord::Migration
  def change
    add_column :restaurants, :image_link, :text
  end
end
