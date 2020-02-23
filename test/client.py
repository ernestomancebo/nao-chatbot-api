import json
from urllib import quote
from urllib2 import HTTPError, URLError, urlopen


class BusSession():

    endpoint = 'http://localhost:5050'
    api = '/api/v1/bus'

    def __init__(self):
        self.vars = {}

    def do_get(self, url):

        try:
            request = urlopen(url)
            return request.read()
        except HTTPError as e:
            return json.dumps({'error': e.code})
        except URLError as e:
            return json.dumps({'error': e.reason.strerror})

    def get_today_busses(self):
        """
        Gets all the busses in the day. Targets: http://localhost:5050/api/v1/bus
        """
        url = "{endpoint}{api}".format(
            endpoint=self.endpoint, api=self.api)
        response = self.do_get(url)

        return response

    def get_next_busses(self):
        """
        Gets all the next busses departing. Targets: http://localhost:5050/api/v1/bus/next
        """
        url = "{endpoint}{api}/next".format(
            endpoint=self.endpoint, api=self.api)
        response = self.do_get(url)

        return response

    def get_next_bus_to(self, destination):
        """
        Gets the next departing bus to somewhere. Targest: http://localhost:5050/api/v1/bus/next/:destination
        """
        url = "{endpoint}{api}/next/{destination}".format(
            endpoint=self.endpoint, api=self.api, destination=quote(destination))
        response = self.do_get(url)

        return response

    def get_next_bus_to_today(self, destination):
        """
        Gets all the upcomming busses departing to somewhere. Targets:  http://localhost:5050/api/v1/bus/next/:destination/today
        """
        url = "{endpoint}{api}/next/{destination}/today".format(
            endpoint=self.endpoint, api=self.api, destination=quote(destination))
        response = self.do_get(url)

        return response

    def get_today_to(self, destination):
        """
        Gets all the buses going to a city today. Targets: http://localhost:5050/api/v1/bus/to/:destination
        """
        url = "{endpoint}{api}/to/{destination}".format(
            endpoint=self.endpoint, api=self.api, destination=quote(destination))
        response = self.do_get(url)

        return response

    def get_bus_status(self, ticket):
        """
        Gets the bus status from a ticket. Targets: http://localhost:5050/api/v1/bus/status/:destination/:hour
        """
        (destination, hour) = str(ticket).split(';')
        url = "{endpoint}{api}/status/{destination}/{hour}".format(
            endpoint=self.endpoint, api=self.api, destination=quote(destination), hour=quote(hour))
        response = self.do_get(url)

        return response


session = BusSession()
response = session.get_next_bus_to('Granada Bus Station')
jsonResponse = json.loads(response)
if (hasattr(jsonResponse, 'error')):
    print(jsonResponse['error'])
else:
    print(jsonResponse['text'])

status = session.get_bus_status('Cordoba;18:30')
jsonStatus = json.loads(status)
print(jsonStatus['text'])
