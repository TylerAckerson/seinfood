class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password] )

    if user
      log_in!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid login credentials"]
      render :new
    end
  end

  def destroy
    log_out!
    render json: {:success => true}
  end

end
