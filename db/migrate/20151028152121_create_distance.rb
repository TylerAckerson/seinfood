class CreateDistance < ActiveRecord::Migration
  def change
    create_table :distances do |t|
      t.integer :restaurant_id, null: false
      t.string :customer_address, null: false

      t.decimal :distance, precision: 10, scale: 4
    end
  end
end
