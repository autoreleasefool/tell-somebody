class CreateClassrooms < ActiveRecord::Migration[5.0]
  def change
    create_table :classrooms do |t|
      t.string :name

      t.timestamps
    end
    add_index :classrooms, :name, unique: true
  end
end
