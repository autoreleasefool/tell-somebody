class CreateUsersAndCommendationsVotesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :votes, id: false do |t|
      t.references :user, index: true
      t.references :commendations, index: true
    end
  end
end
