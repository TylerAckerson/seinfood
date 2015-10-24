class UpdateUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :text, null: false, default: "Default User"
  end
end
