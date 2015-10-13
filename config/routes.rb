Rails.application.routes.draw do
  root "static_pages#home"
  
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :restaurants, only: [:index, :show]
  end

end
