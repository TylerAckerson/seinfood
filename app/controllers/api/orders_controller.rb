class Api::OrdersController < ApplicationController

  def show
    @order = Order.find(params[:id])

    render :show
  end

  def create
    @order = Order.create(order_params)

    if @order.save
      render :show
    else
    end

  end

  private
  def order_params
    params.require(:order).permit(:user_id, :restaurant_id,
                  :scheduled_for, :order_type, :subtotal,
                  :delivery_fee, :tip)
  end
end
