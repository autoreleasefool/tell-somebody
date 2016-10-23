class ChangeOffenderFormatInReports < ActiveRecord::Migration[5.0]
  def up
   remove_column :reports, :offender_id
   add_column :reports, :offender_name, :string
  end

  def down
    remove_column :reports, :offender_name
    add_reference :reports, :offender, references: :users, index: true
    add_foreign_key :reports, :users, column: :offender_id
  end
end
