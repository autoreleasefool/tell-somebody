class Vote < ActiveRecord::Base

  # Associations
  belongs_to :user
  belongs_to :commendation

end