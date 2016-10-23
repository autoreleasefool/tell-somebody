class User < ApplicationRecord
  has_many :students
  has_many :votes
  has_many :created_reports, foreign_key: "reporter_id", class_name: "Report"
  has_many :created_commendations, foreign_key: "commender_id", class_name: "Commendation"
end
