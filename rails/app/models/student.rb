class Student < ActiveRecord::Base

  # Associations
  belongs_to :user
  belongs_to :classroom

end