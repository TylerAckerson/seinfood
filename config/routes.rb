Rails.application.routes.draw do
  root "static_pages#home"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :restaurants, only: [:index, :show]
    resources :orders, only: [:create, :show]
    resources :users, only:  [:show, :update]
  end

end
