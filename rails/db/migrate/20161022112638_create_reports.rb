class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.string :message
      t.boolean :is_anonymous
      t.boolean :is_resolved

      t.timestamps
    end
  end
end
