class CommendationController < ApplicationController
  def new
    commender = User.where(auth_token: params[:auth_token]).first

    classroom_id = params[:classroom_id] || 1
    classroom = Classroom.find(classroom_id) if Classroom.exists?(classroom_id)

    commendation = Commendation.new(commendation_params)
    commendation.commender = commender
    commendation.classroom = classroom
    commendation.is_approved = false

    if commendation.save
      head :ok
    else
      puts commendation.errors.inspect
      head :internal_server_error
    end
  end

  def vote
    user = User.where(auth_token: params[:auth_token]).first
    if !user.blank? and Vote.find_by(user_id: user.id, commendation_id: params[:commendation_id]).nil?
      commendation = Commendation.find(params[:commendation_id]) if Commendation.exists?(params[:commendation_id])

      if commendation.blank?
        head :not_found
        return
      end

      vote = Vote.new
      vote.user = user
      vote.commendation = commendation
      vote.save
      head :ok
    else
      head :unauthorized
    end
  end

  def approved
    commendations = Commendation.all.where(is_approved: true)
    render json: commendations
  end

  def approve
    resolver = User.where(auth_token: params[:auth_token]).first
    if !resolver.blank? and resolver.is_admin
      commendation = Commendation.find(params[:commendation_id]) if Commendation.exists?(params[:commendation_id])

      if commendation.blank?
        head :not_found
        return
      end

      commendation.is_approved = true
      if commendation.save
        head :ok
      else
        head :internal_server_error
      end
    else
      head :not_found
    end
  end

  private

  def commendation_params
    params.require(:commendation).permit(:message, :is_anonymous, :receiver_name)
  end
end
