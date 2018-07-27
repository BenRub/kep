from flask import Flask, request
from flask_restful import Api, Resource, marshal
from flask_cors import CORS
from dblayer import DBLayer

app = Flask(__name__, static_url_path="")
CORS(app)
api = Api(app)

class CurrenciesAPI(Resource):

    def __init__(self):        
        self.dbLayer = DBLayer()
        super(CurrenciesAPI, self).__init__()

    def get(self):
        return self.dbLayer.get_data()

    def post(self):
        x = self.dbLayer.insert_data(request.get_json())
        return x, 201


api.add_resource(CurrenciesAPI, '/currencies')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
