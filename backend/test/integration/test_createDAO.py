import pytest
import unittest.mock as mock
import json, os
import pymongo
from unittest.mock import patch, MagicMock
from src.util.validators import getValidator

# Different SUT
from src.util.daos import getDao
from src.util.dao import DAO


class TestDatabase:
    """This test demonstrates the use of yield as an alternative to return, which allows to write code *after* the statement
    which will be executed once all tests have run. This can be used for cleanup."""

    @pytest.fixture
    def sut(self):
        fabricatedFileName = './src/static/validators/test.json'
        self.json_string = {
                "$jsonSchema": {
                    "bsonType": "object",
                    "required": ["name", "lastname"],
                    "properties": {
                        "name": {
                            "bsonType": "string",
                            "description": "firstname of test user"
                        },
                        "lastname" : {
                            "bsonType": "string",
                            "description": "lastname of test user"
                        }
                    }
                }
            }
        with open(fabricatedFileName, 'w') as outfile:
            json.dump(self.json_string, outfile)

        # yield instead of return the system under test
        yield DAO(collection_name="test")

        # clean up the file after all tests have run
        os.remove(fabricatedFileName)

        #remove the collection
        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        mydb = myclient["edutask"]
        mycol = mydb["test"]

        mycol.drop()


    @pytest.mark.demo
    def test_create_ValidationTrue(self, sut):
        content = sut.create({"name": "frida", "lastname": "doe"})
        print(type(content))
        assert type(content) == dict



    