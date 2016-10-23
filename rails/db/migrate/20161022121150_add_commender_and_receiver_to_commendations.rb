class AddCommenderAndReceiverToCommendations < ActiveRecord::Migration[5.0]
  def change
    add_reference :commendations, :commender, references: :users, index: true
    add_foreign_key :commendations, :users, column: :commender_id

    add_reference :commendations, :receiver, references: :users, index: true
    add_foreign_key :commendations, :users, column: :receiver_id
  end
end
