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
                    "required": ["name", "lastname", "email"],
                    "properties": {
                        "name": {
                            "bsonType": "string",
                            "description": "firstname of test user"
                        },
                        "lastname" : {
                            "bsonType": "string",
                            "description": "lastname of test user"
                        },
                        "email": {
                            "bsonType": "string",
                            "description": "the email address of a user must be determined"
                        },
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
        testcol = mydb["test"]
        testcol.drop()


    @pytest.mark.demo
    def test_create_ValidationTrue(self, sut):
        """ Control that a dict/json is returned when all validates correct """
        content = sut.create({"name": "jane", "lastname": "doe", "email": "jane.doe@test.com"})
        assert type(content) == dict

    def test_create_ValidationTrue_name(self, sut):
        """ Check value of key name """
        content = sut.create({"name": "jane", "lastname": "doe", "email": "jane.doe@test.com"})
        assert content["name"] == "jane"

    
    def test_create_incorrectbson(self, sut):
        """ Wrong bson type of name """
        with pytest.raises(Exception):
            sut.create({"name": 13, "lastname": "doe", "email": "jane.doe@test.com"})

    def test_create_missingData(self, sut):
        """ Missing lastname """
        with pytest.raises(Exception):
            sut.create({"name": "jane", "email": "jane.doe@test.com"})
    
    def test_create_notUnique(self, sut):
        with pytest.raises(Exception):
            sut.create({"name": "jane", "lastname": "doe", "email": "jane.doe@test.com"})
            sut.create({"name": "test", "lastname": "doe", "email": "jane.doe@test.com"})
 
        



    