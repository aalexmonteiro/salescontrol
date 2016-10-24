class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :name, null: false
      t.string :phone, null: false

      t.timestamps null: false
    end
    add_index :customers, :phone, unique: true
  end
end
