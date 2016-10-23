class Commendation < ApplicationRecord
  has_many :votes
  belongs_to :classroom
  belongs_to :commender , class_name: "User"
end
