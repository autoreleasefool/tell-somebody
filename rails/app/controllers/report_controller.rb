class ReportController < ApplicationController
  def new
    reporter = User.where(auth_token: params[:auth_token]).first

    report = Report.new(report_params)
    report.reporter = reporter
    report.is_resolved = false

    if report.save
      head :ok
    else
      head :internal_server_error
    end
  end

  def resolve
    resolver = User.where(auth_token: params[:auth_token]).first
    if !resolver.blank? and resolver.is_admin
      report = Report.find(params[:report_id]) if Report.exists?(params[:report_id])

      if report.blank?
        head :not_found
        return
      end

      report.is_resolved = true
      if report.save
        head :ok
      else
        head :internal_server_error
      end
    else
      head :not_found
    end
  end

  def resolved
    reports = Report.all.where(is_resolved: true).order('created_at DESC')
    render json: reports
  end

  def all
    reports = Report.all.order('created_at DESC')
    render json: reports
  end

  private

  def report_params
    params.require(:report).permit(:message, :is_anonymous, :offender_name)
  end
end
