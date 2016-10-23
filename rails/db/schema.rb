# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161023002949) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "classrooms", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_classrooms_on_name", unique: true, using: :btree
  end

  create_table "commendations", force: :cascade do |t|
    t.string   "message"
    t.boolean  "is_anonymous"
    t.boolean  "is_approved"
    t.integer  "votes"
    t.integer  "classroom_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "commender_id"
    t.string   "receiver_name"
    t.index ["classroom_id"], name: "index_commendations_on_classroom_id", using: :btree
    t.index ["commender_id"], name: "index_commendations_on_commender_id", using: :btree
  end

  create_table "reports", force: :cascade do |t|
    t.string   "message"
    t.boolean  "is_anonymous"
    t.boolean  "is_resolved"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "reporter_id"
    t.string   "offender_name"
    t.index ["reporter_id"], name: "index_reports_on_reporter_id", using: :btree
  end

  create_table "students", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "classroom_id"
    t.index ["classroom_id"], name: "index_students_on_classroom_id", using: :btree
    t.index ["user_id"], name: "index_students_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.boolean  "is_admin",   default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "auth_token"
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true, using: :btree
    t.index ["name"], name: "index_users_on_name", unique: true, using: :btree
  end

  create_table "votes", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "commendations_id"
    t.integer "commendation_id"
    t.index ["commendation_id"], name: "index_votes_on_commendation_id", using: :btree
    t.index ["commendations_id"], name: "index_votes_on_commendations_id", using: :btree
    t.index ["user_id"], name: "index_votes_on_user_id", using: :btree
  end

  add_foreign_key "commendations", "classrooms"
  add_foreign_key "commendations", "users", column: "commender_id"
  add_foreign_key "reports", "users", column: "reporter_id"
  add_foreign_key "votes", "commendations"
end
