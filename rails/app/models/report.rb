class Report < ApplicationRecord
  belongs_to :reporter , class_name: "User"
end
