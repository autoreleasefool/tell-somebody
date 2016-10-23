class ChangeReceiverFormatInCommendations < ActiveRecord::Migration[5.0]
  def up
   remove_column :commendations, :receiver_id
   add_column :commendations, :receiver_name, :string
  end

  def down
    remove_column :commendations, :receiver_name
    add_reference :commendations, :receiver, references: :users, index: true
    add_foreign_key :commendations, :users, column: :receiver_id
  end
end
