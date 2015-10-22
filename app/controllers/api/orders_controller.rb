class Api::OrdersController < ApplicationController

  def show
    @order = Order.find(params[:id])
    
    render :show
  end

  def create
    order_items = params[:items][:items]
    user_id = params[:user_id].to_i
    restaurant_id = params[:restaurantId].to_i

    @order = Order.create(user_id: user_id,
                          restaurant_id: restaurant_id,
                          scheduled_for: Time.now,
                          order_type: "delivery",
                          subtotal: 10.5,
                          delivery_fee: 2.5)
    if @order.save
      render :show
    end

  end

  private
  def order_params
    params.require(:order).permit(:user_id, :restaurant_id,
                  :scheduled_for, :order_type, :subtotal, :delivery_fee)
  end
end
