class CreateCommendations < ActiveRecord::Migration[5.0]
  def change
    create_table :commendations do |t|
      t.string :message
      t.boolean :is_anonymous
      t.boolean :is_approved
      t.integer :votes
      t.references :classroom, foreign_key: true

      t.timestamps
    end
  end
end
