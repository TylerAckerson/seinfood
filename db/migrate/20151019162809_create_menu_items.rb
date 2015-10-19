class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :category, null: false
      t.integer :restaurant_id, null:false
      t.boolean :archived, default: false

      t.timestamps null: false
    end

    add_index :menu_items, :category
    add_index :menu_items, :restaurant_id
  end
end
