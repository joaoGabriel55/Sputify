require 'sinatra'
require 'sinatra/cross_origin'
require 'json'

# In-memory storage for tasks
songs = [
	{
		id: 1,
		title: 'Rein me in - feat. Olivia Dean',
		artist: 'Sam Fender',
		album: 'People Watching',
		audio: 'samfender_reinmein.mp3'
	},
	{
		id: 2,
		title: 'Tyrants',
		artist: 'Sam Fender',
		album: 'People Watching',
		audio: 'samfender_tyrants.mp3'
	},
	{
		id: 3,
		title: 'Something in the Orange',
		artist: 'Zach Bryan',
		album: 'American Heartbreak',
		audio: 'zach_bryan_something_in_the_orange.mp3'
	},
]

# GET /tasks - Retrieve all tasks
get '/songs' do
  content_type :json
  songs.to_json
end

get '/songs/:id' do
	song = songs.find { |s| s[:id] == params[:id].to_i }
	halt 404, { error: 'Song not found' }.to_json unless song

	content_type :json
	song.to_json
end

# GET /tasks/:id - Retrieve a specific task by ID
get '/songs/:id/audio' do
	song = songs.find { |s| s[:id] == params[:id].to_i }
	halt 404, { error: 'Song not found' }.to_json unless song

	file_path = File.join(Dir.pwd, "audios/#{song[:audio]}")
	halt 404, { error: 'Audio file not found' }.to_json unless File.exist?(file_path)

	content_type 'audio/mpeg'
	send_file file_path, disposition: 'inline'
end

configure do
	enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

# Error handling for invalid JSON
error JSON::ParserError do
  status 400
  content_type :json
  { error: 'Invalid JSON format' }.to_json
end