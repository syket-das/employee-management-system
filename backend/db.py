import pymongo

mongoURI = 'mongodb+srv://syket:1234@cluster0.4ttg0.mongodb.net/?retryWrites=true&w=majority'

client = pymongo.MongoClient(mongoURI)

db = client['fastapi']

collection = db['employee']


def create (data ):
        data = dict(data)
        response = collection.insert_one(data)
        return str(response.inserted_id) 
    

def all():
    response = collection.find({})
    data = []
    for i in response:
        i['_id'] = str(i['_id']) 
        data.append(i)
    return data


def get_one(name):
    response = collection.find_one({"name":name})
    response['_id'] = str(response['_id'])
    return response


def update(name, data):
    data = dict(data)
    response = collection.update_one({"name":name}, {"$set":data})
    return response.modified_count


def delete(name):
    response = collection.delete_one({"name":name})
    
    return response.deleted_count   