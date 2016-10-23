class ClassroomController < ApplicationController

  def new
    classroom = Classroom.new(classroom_params)
    begin
      if classroom.save
        render json: classroom
      else
        head :internal_server_error
      end
    rescue  ActiveRecord::RecordNotUnique
      head :internal_server_error
    end
  end

  def add_user
    classroom = Classroom.find(params[:classroom_id]) if Classroom.exists?(params[:classroom_id])
    if classroom.blank?
      head :not_found
      return
    end

    user = User.find(params[:user_id]) if User.exists?([params[:user_id]])
    classroom.users << user

    if classroom.save
      render json: classroom
    else
      head :internal_server_error
    end
  end

  private

  def classroom_params
    params.require(:classroom).permit(:name)
  end
end
