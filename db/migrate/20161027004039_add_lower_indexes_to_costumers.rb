class AddLowerIndexesToCostumers < ActiveRecord::Migration
  def up
  	execute %{
  		CREATE INDEX
  			customers_lower_name
  		ON
  			customers(lower(name) varchar_pattern_ops)
  	}
  end

  def down
  	remove_index :customers, name: 'customers_lower_name'
  end
end
