class HomeController < ApplicationController
	respond_to :html, :json

  def index
  end

  def reddit_search
  	reddit_service = RedditService.new
  	sort = 'new'
  	response = reddit_service.search params[:query], sort

  	return render json: { error: 'Something went wrong!' }, status: :bad_request unless response[:count].present?
  	
  	return render json: { status: 'success', count: response[:count], results: response[:results] }
  end
end
