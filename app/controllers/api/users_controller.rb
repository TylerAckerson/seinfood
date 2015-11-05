class Api::UsersController < ApplicationController

  def show
    @user = User.find_by_id(params[:id])

    render :show
  end

  def update
    @user = User.find_by_id(params[:id])
    @user.update!(user_params)

    render :show
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :address, :city, :state)
  end
end
