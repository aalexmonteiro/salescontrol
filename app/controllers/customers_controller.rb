class CustomersController < ApplicationController
	def index
		if params[:keywords].present?
			@keywords = params[:keywords]
			customer_search = CustomerSearch.new(@keywords)
			@customers = Customer.where(
				customer_search.where_clause,
				customer_search.where_args)
				.order(customer_search.order)
		else
			@customers = []
		end
	end
end