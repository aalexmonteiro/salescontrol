require 'rails_helper'

klass = CustomerSearch
describe klass do
	before :all do
		name ||= Faker::Name.name_with_middle
		phone ||= Faker::PhoneNumber.phone_number
		klass.new('ale')
		Customer.create!(name: name, phone: phone)
	end

	describe 'search' do
		it 'search a customer' do
			 
		end
	end
end
