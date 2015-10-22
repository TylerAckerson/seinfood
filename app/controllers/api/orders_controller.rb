class Api::OrdersController < ApplicationController

  def show
  end

  def create
    order_items = params[:orderInfo][:order]
    user_id = params[:orderInfo][:user_id].to_i
    restaurant_id = params[:orderInfo][:restaurantId].to_i

    #adding temp params
    @order = Order.create(user_id: user_id,
                          restaurant_id: restaurant_id,
                          type: "delivery",
                          subtotal: 10.5,
                          delivery_fee: 2.5)

    a = Order.create(user_id: 1,
                          restaurant_id: 1,
                          type: "delivery",
                          subtotal: 10.5,
                          delivery_fee: 2.5)

    fail
  end

  private
  def order_params
    params.require(:order).permit(:user_id, :restaurant_id, :type, :subtotal, :delivery_fee, )
  end
end
