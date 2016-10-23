class CreateClassroomAndUserJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :students, id: false do |t|
      t.references :user, index: true
      t.references :classroom, index: true
    end
  end
end
