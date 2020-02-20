
from urllib2 import HTTPCookieProcessor, Request, build_opener, urlopen


class BusSession():

	endpoint = 'http://localhost:5050'
	api = '/api/v1/bus'

	def __init__(self):
		self.vars = {}

	def do_get(self, url):
		request = urlopen(url)
		response = request.read()

		return response

	def get_next_departure(self, destination):
		url = "{endpoint}{api}/destination/next/{destination}".format(endpoint=self.endpoint, api=self.api, destination=destination)
		response = self.do_get(url)
		print(response)

	def get_itinerary(self, destination):
		url = "{endpoint}{api}/destination/{destination}".format(endpoint=self.endpoint, api=self.api, destination=destination)
		response = self.do_get(url)
		print(response)

session = BusSession()
session.get_itinerary('Cordoba')
