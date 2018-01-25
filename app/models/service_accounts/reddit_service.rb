class RedditService

	def search(query, sort)
		end_point = "search.json"
    parameters = {
      'q' => "#{query}",
      'sort' => "#{sort}"
    }
    results = reddit_api_request end_point, parameters

    fix_results results
  end

  private

  def reddit_api_request(end_point, parameters)
    request_url = "https://www.reddit.com/#{end_point}"
    headers = {'User-Agent' => 'your_agent'}
    response = HTTParty.get request_url, :headers => headers, :query => parameters

    parse_response response.body
  end

  def fix_results(results)
  	results_summary = []
  	data = results['data'].try(:[], 'children')

		if data.try :any?
			data.each do |d| 
				results_summary << d['data'].slice('author', 'url', 'title', 'selftext', 'preview') 
			end
		end

  	fixed_results = {
  		count: results['data'].try(:[], 'dist'),
  		results: results_summary
  	}
  end

  def parse_response(response)
    begin
      return JSON.parse response
    rescue JSON::ParserError => e
      return response
    end
  end
end