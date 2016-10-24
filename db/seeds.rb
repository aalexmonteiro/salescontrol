# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Faker::Config.locale = 'pt-BR'

100.times do |i|
	Customer.create!(
		name: Faker::Name.name_with_middle,
		phone: "#{Faker::PhoneNumber.phone_number}#{i}")
end
