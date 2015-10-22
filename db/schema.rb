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

ActiveRecord::Schema.define(version: 20151022154257) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "menu_items", force: :cascade do |t|
    t.string   "name",                          null: false
    t.string   "description",                   null: false
    t.string   "category",                      null: false
    t.integer  "restaurant_id",                 null: false
    t.boolean  "archived",      default: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.float    "price",         default: 0.0
  end

  add_index "menu_items", ["category"], name: "index_menu_items_on_category", using: :btree
  add_index "menu_items", ["restaurant_id"], name: "index_menu_items_on_restaurant_id", using: :btree

  create_table "menus", force: :cascade do |t|
    t.string   "name",                          null: false
    t.string   "description",                   null: false
    t.string   "category",                      null: false
    t.integer  "restaurant_id",                 null: false
    t.boolean  "archived",      default: false, null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "menus", ["category"], name: "index_menus_on_category", using: :btree
  add_index "menus", ["restaurant_id"], name: "index_menus_on_restaurant_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id",                              null: false
    t.integer  "restaurant_id",                        null: false
    t.datetime "scheduled_for",                        null: false
    t.string   "order_type",                           null: false
    t.string   "status",        default: "In Process"
    t.decimal  "subtotal",                             null: false
    t.decimal  "delivery_fee",                         null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

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
    t.float    "delivery_fee", default: 0.0
    t.boolean  "takeout_only", default: false
    t.text     "image_link"
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
