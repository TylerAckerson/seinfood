# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151013170441) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "restaurants", force: :cascade do |t|
    t.text     "name",                                   null: false
    t.text     "cuisine",                                null: false
    t.text     "address",                                null: false
    t.text     "city",         default: "New York City"
    t.text     "state",        default: "New York"
    t.integer  "yelp_id"
    t.integer  "opens_at",     default: 800
    t.integer  "closes_at",    default: 2200
    t.float    "delivery_min", default: 0.0
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                                     null: false
    t.string   "password_digest",                           null: false
    t.string   "session_token",                             null: false
    t.text     "address",                                   null: false
    t.text     "city",            default: "New York City"
    t.text     "state",           default: "New York"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
