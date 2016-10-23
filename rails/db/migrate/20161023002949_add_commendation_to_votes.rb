class AddCommendationToVotes < ActiveRecord::Migration[5.0]
  def change
    add_reference :votes, :commendation, foreign_key: true
  end

  def up
    remove_column :votes, :commendations_id
  end

  def down
    add_reference :votes, :commendations_id, references: :commendations, index: true
    add_foreign_key :votes, :commendations, column: :commendations_id
  end
end
