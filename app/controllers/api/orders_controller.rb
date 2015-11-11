class Api::OrdersController < ApplicationController
  def show
    @order = Order.find(params[:id])

    render :show
  end

  def create
    @order = Order.create(order_params)

    if @order.save
      render :show
      send_notification(params[:restaurant_id])
    end
  end

  def send_notification(restaurant_id)
    account_sid = 'AC3005ff80434f08de50a594944fb8dc11'
    auth_token = 'e49505baded39f1803f9d3f15a5f747b'

    @client = Twilio::REST::Client.new account_sid, auth_token

    name = params[:order][:restaurant][:name]
    image = params[:order][:restaurant][:image_link]

    @client.messages.create(
      from: '+15173250614',
      to: '+15177123399',
      body: "Hey! Somebody placed an order on Seinfood from #{name}",
      media_url: image
      )
  end

  private
  def order_params
    params.require(:order).permit(:user_id, :restaurant_id,
                  :scheduled_for, :order_type, :subtotal,
                  :delivery_fee)
  end
end
