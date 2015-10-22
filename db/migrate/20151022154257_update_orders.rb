class UpdateOrders < ActiveRecord::Migration
  def change
    rename_column :orders, :type, :order_type
  end
end
