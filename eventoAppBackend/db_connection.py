import pymongo

url = "mongodb+srv://stagoace:Sc1040950043@cluster.t2jyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
client = pymongo.MongoClient(url)

db = client['Eventos']