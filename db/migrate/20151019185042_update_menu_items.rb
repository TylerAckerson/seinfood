class UpdateMenuItems < ActiveRecord::Migration
  def change
    add_column :menu_items, :price, :float, default: 0.0
  end
end
