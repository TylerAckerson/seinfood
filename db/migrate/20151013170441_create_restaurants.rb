class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.text :name, null: false
      t.text :cuisine, null: false
      t.text :address, null: false
      t.text :city, default: "New York City"
      t.text :state, default: "New York"
      t.integer :yelp_id
      t.integer :opens_at, default: 800
      t.integer :closes_at, default: 2200
      t.float :delivery_min, default: 0

      t.timestamps null: false
    end
  end
end
