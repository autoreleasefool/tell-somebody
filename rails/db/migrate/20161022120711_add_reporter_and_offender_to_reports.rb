class AddReporterAndOffenderToReports < ActiveRecord::Migration[5.0]
  def change
    add_reference :reports, :reporter, references: :users, index: true
    add_foreign_key :reports, :users, column: :reporter_id

    add_reference :reports, :offender, references: :users, index: true
    add_foreign_key :reports, :users, column: :offender_id
  end
end
