class CustomerSearch
	attr_reader :where_clause, :where_args, :order
	def initialize(query)
		query = query.downcase
		@where_clause = ''
		@where_args = {}
		build_for_name_search(query)
	end

	def build_for_name_search(query)
		@where_clause << case_insensitive(:name)
		@where_args[:name] = starts_with(query)

		@order = 'name asc'
	end

	def starts_with(query)
		'%' + query + '%'
	end

	def case_insensitive(field_name)
		"lower(#{field_name}) like :#{field_name}"
	end
	
end