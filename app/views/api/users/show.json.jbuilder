json.extract! @user, :id, :email, :address, :city, :state

json.orders do
  json.array! @user.orders do |order|
    json.extract! order, :id, :user_id, :restaurant_id, :order_type, :tip,
                         :status, :subtotal, :delivery_fee, :created_at
  end
end
