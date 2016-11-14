require 'rails_helper'

klass = CustomerSearch
describe klass do
	before :all do
		name ||= 'Alex'
		phone ||= Faker::PhoneNumber.phone_number
		@customerSearch = klass.new(':name')
	end

	describe 'Creating a query' do
		it 'setting the where clause' do
			 expect(@customerSearch.where_clause).to eq('lower(name) like :name')
		end

		it 'search a customer' do
			 expect(@customerSearch.where_args).to eq({:name=>"%:name%"})
		end
	end
end
