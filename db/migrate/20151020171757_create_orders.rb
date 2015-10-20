class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.datetime :scheduled_for, null: false
      t.string :type, null: false
      t.string :status, default: "In Process"
      t.decimal :subtotal, null: false
      t.decimal :delivery_fee, null: false

      t.timestamps null: false
    end
  end
end
