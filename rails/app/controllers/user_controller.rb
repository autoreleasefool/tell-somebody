class UserController < ApplicationController
  def new
    user = User.new(user_params)
    user.is_admin = false
    user.auth_token = generate_auth_token

    begin
      if user.save
        render json: { auth_token: user.auth_token, is_admin: user.is_admin, id: user.id }
      else
        head :internal_server_error
      end
    rescue  ActiveRecord::RecordNotUnique
      head :internal_server_error
    end
  end

  def login
    user = User.where(name: params[:name]).first
    unless user.blank?
      render json: { auth_token: user.auth_token, is_admin: user.is_admin, id: user.id }
    else
      head :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

  def generate_auth_token
    auth_token = ''
    begin
      auth_token = SecureRandom.hex
    end while User.exists?(auth_token: auth_token)
    return auth_token
  end
end
