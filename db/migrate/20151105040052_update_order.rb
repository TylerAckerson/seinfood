class UpdateOrder < ActiveRecord::Migration
  def change
    add_column :orders, :tip, :decimal
  end
end
